import { Construct } from 'constructs'

import { config } from './config'

import { App } from 'cdktf'
import { RemoteBackend } from 'cdktf'
import { TerraformStack } from 'cdktf'

import { AwsProvider, sns, datasources, kms } from '@cdktf/provider-aws'
import { PagerdutyProvider } from '@cdktf/provider-pagerduty'
import { NullProvider } from '@cdktf/provider-null'
import { LocalProvider } from '@cdktf/provider-local'
import { ArchiveProvider } from '@cdktf/provider-archive'
import { PocketALBApplication } from '@pocket-tools/terraform-modules'

class WebClient extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    new AwsProvider(this, 'aws', { region: 'us-east-1' })
    new PagerdutyProvider(this, 'pagerduty_provider', { token: undefined })
    new NullProvider(this, 'null-provider')
    new LocalProvider(this, 'local-provider')
    new ArchiveProvider(this, 'archive-provider')
    new RemoteBackend(this, {
      hostname: 'app.terraform.io',
      organization: 'Pocket',
      workspaces: [{ prefix: `${config.name}-` }]
    })

    const region = new datasources.DataAwsRegion(this, 'region')
    const caller = new datasources.DataAwsCallerIdentity(this, 'caller')
    const secretsManager = new kms.DataAwsKmsAlias(this, 'kms_alias', {
      name: 'alias/aws/secretsmanager'
    })

    // Created by shared infrastructure
    const snsTopic = new sns.DataAwsSnsTopic(this, 'frontend_notifications', {
      name: `Frontend-${config.environment}-ChatBot`
    })

    new PocketALBApplication(this, 'application', {
      prefix: config.prefix,
      alb6CharacterPrefix: config.shortName,
      tags: config.tags,
      cdn: false,
      domain: config.domain,
      containerConfigs: [
        {
          name: 'app',
          portMappings: [
            {
              hostPort: 80,
              containerPort: 80
            }
          ],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost/web-client-health || exit 1'],
            interval: 15,
            retries: 3,
            timeout: 5,
            startPeriod: 0
          },
          envVars: [
            {
              name: 'NODE_ENV',
              value: process.env.NODE_ENV // this gives us a nice lowercase production and development
            },
            {
              name: 'DOMAIN',
              value: config.domain
            },
            {
              name: 'ASSET_PREFIX',
              value: 'https://assets.getpocket.com/web-client'
            }
          ],
          secretEnvVars: [
            {
              name: 'SENTRY_DSN',
              valueFrom: `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}/SENTRY_DSN`
            }
          ]
        },
        {
          name: 'xray-daemon',
          containerImage: 'amazon/aws-xray-daemon',
          repositoryCredentialsParam: `arn:aws:secretsmanager:${region.name}:${caller.accountId}:secret:Shared/DockerHub`,
          portMappings: [
            {
              hostPort: 2000,
              containerPort: 2000,
              protocol: 'udp'
            }
          ],
          command: ['--region', 'us-east-1', '--local-mode']
        }
      ],
      codeDeploy: {
        useCodeDeploy: true,
        useCodePipeline: true,
        notifications: {
          notifyOnFailed: true,
          notifyOnStarted: false,
          notifyOnSucceeded: true
        },
        snsNotificationTopicArn: snsTopic.arn
      },
      exposedContainer: {
        name: 'app',
        port: 80,
        healthCheckPath: '/web-client-health'
      },
      ecsIamConfig: {
        prefix: config.prefix,
        taskExecutionRolePolicyStatements: [
          //This policy could probably go in the shared module in the future.
          {
            actions: ['secretsmanager:GetSecretValue', 'kms:Decrypt'],
            resources: [
              `arn:aws:secretsmanager:${region.name}:${caller.accountId}:secret:Shared`,
              `arn:aws:secretsmanager:${region.name}:${caller.accountId}:secret:Shared/*`,
              secretsManager.targetKeyArn,
              `arn:aws:secretsmanager:${region.name}:${caller.accountId}:secret:${config.name}/${config.environment}`,
              `arn:aws:secretsmanager:${region.name}:${caller.accountId}:secret:${config.name}/${config.environment}/*`
            ],
            effect: 'Allow'
          },
          {
            actions: ['ssm:GetParameter*'],
            resources: [
              `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}`,
              `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}/*`
            ],
            effect: 'Allow'
          }
        ],
        taskRolePolicyStatements: [
          {
            actions: [
              'xray:PutTraceSegments',
              'xray:PutTelemetryRecords',
              'xray:GetSamplingRules',
              'xray:GetSamplingTargets',
              'xray:GetSamplingStatisticSummaries'
            ],
            resources: ['*'],
            effect: 'Allow'
          }
        ],
        taskExecutionDefaultAttachmentArn:
          'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy'
      },

      autoscalingConfig: {
        targetMinCapacity: 5,
        targetMaxCapacity: 30
      },
      alarms: {
        httpLatency: {
          evaluationPeriods: 2,
          threshold: 500,
          actions: []
        }
      }
    })
  }
}

const app = new App()
new WebClient(app, 'web-client')
app.synth()
