import { Construct } from 'constructs'

import { config } from './config'

import { App } from 'cdktf'
import { RemoteBackend } from 'cdktf'
import { TerraformStack } from 'cdktf'

import { AwsProvider } from '../.gen/providers/aws'
import { DataAwsKmsAlias } from '../.gen/providers/aws'
import { DataAwsCallerIdentity } from '../.gen/providers/aws'
import { DataAwsRegion } from '../.gen/providers/aws'
import { DataAwsSnsTopic } from '../.gen/providers/aws'
import { PagerdutyProvider } from '../.gen/providers/pagerduty'

import { PocketALBApplication } from '@pocket/terraform-modules'

class WebClient extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    new AwsProvider(this, 'aws', { region: 'us-east-1' })
    new PagerdutyProvider(this, 'pagerduty_provider', { token: undefined })
    new RemoteBackend(this, {
      hostname: 'app.terraform.io',
      organization: 'Pocket',
      workspaces: [{ prefix: `${config.name}-` }]
    })

    const region = new DataAwsRegion(this, 'region');
    const caller = new DataAwsCallerIdentity(this, 'caller');
    const secretsManager = new DataAwsKmsAlias(this, 'kms_alias', {
      name: 'alias/aws/secretsmanager',
    });

    // Created by shared infrastructure
    const snsTopic = new DataAwsSnsTopic(this, 'frontend_notifications', {
      name: `Frontend-${config.environment}-ChatBot`
    });

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
              containerPort: 80,
            },
          ],
          healthCheck: {
            command: [
              'CMD-SHELL',
              'curl -f http://localhost/web-client-health || exit 1',
            ],
            interval: 15,
            retries: 3,
            timeout: 5,
            startPeriod: 0,
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
              protocol: 'udp',
            },
          ],
          command: ['--region', 'us-east-1', '--local-mode'],
        }
      ],
      codeDeploy: {
        useCodeDeploy: true,
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
              `arn:aws:secretsmanager:${region.name}:${caller.accountId}:secret:${config.name}/${config.environment}/*`,
            ],
            effect: 'Allow',
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
        // TODO: Get a way to send this direct to Kelvin's neighbors phone
        http5xxError: {
          threshold: 10,
          evaluationPeriods: 2,
          period: 600,
          actions: []
        },
        httpLatency: {
          evaluationPeriods: 2,
          threshold: 500,
          actions: []
        },
        httpRequestCount: {
          threshold: 5000,
          evaluationPeriods: 2,
          actions: []
        }
      }
    });
  }
}

const app = new App()
new WebClient(app, 'web-client')
app.synth()
