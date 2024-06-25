import { config } from './config'
import { Construct } from 'constructs'
import { App, S3Backend, TerraformStack } from 'cdktf'

import {
  provider as awsProvider,
  dataAwsRegion,
  dataAwsCallerIdentity,
  dataAwsKmsAlias,
  dataAwsSnsTopic
} from '@cdktf/provider-aws'
import { provider as nullProvider } from '@cdktf/provider-null'
import { provider as localProvider } from '@cdktf/provider-local'
import { provider as archiveProvider } from '@cdktf/provider-archive'
import { PocketALBApplication } from '@pocket-tools/terraform-modules'
import * as fs from 'fs'

class WebClient extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    new awsProvider.AwsProvider(this, 'aws', {
      region: 'us-east-1',
      defaultTags: [{ tags: config.tags }]
    })
    new nullProvider.NullProvider(this, 'null-provider')
    new localProvider.LocalProvider(this, 'local-provider')
    new archiveProvider.ArchiveProvider(this, 'archive-provider')
    new S3Backend(this, {
      bucket: `mozilla-pocket-team-${config.environment.toLowerCase()}-terraform-state`,
      dynamodbTable: `mozilla-pocket-team-${config.environment.toLowerCase()}-terraform-state`,
      key: config.name,
      region: 'us-east-1'
    })

    const region = new dataAwsRegion.DataAwsRegion(this, 'region')
    const caller = new dataAwsCallerIdentity.DataAwsCallerIdentity(this, 'caller')

    this.createPocketAlbApplication({
      secretsManagerKmsAlias: this.getSecretsManagerKmsAlias(),
      snsTopic: this.getCodeDeploySnsTopic(),
      region,
      caller
    })
  }

  /**
   * Get the sns topic for code deploy
   * @private
   */
  private getCodeDeploySnsTopic() {
    return new dataAwsSnsTopic.DataAwsSnsTopic(this, 'frontend_notifications', {
      name: `Frontend-${config.environment}-ChatBot`
    })
  }

  /**
   * Get secrets manager kms alias
   * @private
   */
  private getSecretsManagerKmsAlias() {
    return new dataAwsKmsAlias.DataAwsKmsAlias(this, 'kms_alias', {
      name: 'alias/aws/secretsmanager'
    })
  }

  private createPocketAlbApplication(dependencies: {
    region: dataAwsRegion.DataAwsRegion
    caller: dataAwsCallerIdentity.DataAwsCallerIdentity
    secretsManagerKmsAlias: dataAwsKmsAlias.DataAwsKmsAlias
    snsTopic: dataAwsSnsTopic.DataAwsSnsTopic
  }): PocketALBApplication {
    const { region, caller, secretsManagerKmsAlias, snsTopic } = dependencies

    return new PocketALBApplication(this, 'application', {
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
            },
            {
              name: 'BRAZE_PRIVATE_KEY',
              valueFrom: `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}/BRAZE_PRIVATE_KEY`
            },
            {
              name: 'REVALIDATION_TOKEN',
              valueFrom: `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}/REVALIDATION_TOKEN`
            }
          ],
          logMultilinePattern: '^\\S.+'
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
        useCodePipeline: false,
        useTerraformBasedCodeDeploy: false,
        generateAppSpec: false,
        notifications: {
          notifyOnFailed: true,
          notifyOnStarted: false,
          notifyOnSucceeded: false
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
              secretsManagerKmsAlias.targetKeyArn,
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
          actions: config.isDev ? [] : [] //[pagerDuty!.snsCriticalAlarmTopic.arn],
        }
      }
    })
  }
}

const app = new App()
const stack = new WebClient(app, 'web-client')
const tfEnvVersion = fs.readFileSync('.terraform-version', 'utf8')
stack.addOverride('terraform.required_version', tfEnvVersion)
app.synth()
