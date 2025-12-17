import { provider as archiveProvider } from '@cdktf/provider-archive'
import {
  provider as awsProvider,
  dataAwsRegion,
  dataAwsCallerIdentity,
  dataAwsKmsAlias
} from '@cdktf/provider-aws'
import { provider as localProvider } from '@cdktf/provider-local'

import { provider as nullProvider } from '@cdktf/provider-null'
import { PocketALBApplication } from '@pocket-tools/terraform-modules'
import { App, S3Backend, TerraformStack } from 'cdktf'
import { Construct } from 'constructs'
import * as fs from 'fs'
import { config } from './config'

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
      region,
      caller
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
  }): PocketALBApplication {
    const { region, caller, secretsManagerKmsAlias } = dependencies

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
              hostPort: 3000,
              containerPort: 3000
            }
          ],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost:3000/web-client-health || exit 1'],
            interval: 15,
            retries: 3,
            timeout: 5,
            startPeriod: 0
          },
          envVars: [
            {
              name: 'NODE_ENV',
              value: process.env.NODE_ENV ?? 'development' // this gives us a nice lowercase production and development
            },
            {
              name: 'DOMAIN',
              value: config.domain
            },
            {
              name: 'ASSET_PREFIX',
              value: config.assetsPrefix
            },
            {
              name: 'HOSTNAME',
              value: '0.0.0.0'
            }
          ],
          secretEnvVars: [
            {
              name: 'SENTRY_DSN',
              valueFrom: `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}/SENTRY_DSN`
            },
            {
              name: 'REVALIDATION_TOKEN',
              valueFrom: `arn:aws:ssm:${region.name}:${caller.accountId}:parameter/${config.name}/${config.environment}/REVALIDATION_TOKEN`
            }
          ],
          logMultilinePattern: '^\\S.+'
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
        }
      },
      exposedContainer: {
        name: 'app',
        port: 3000,
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
        taskRolePolicyStatements: [],
        taskExecutionDefaultAttachmentArn:
          'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy'
      },

      autoscalingConfig: {
        targetMinCapacity: config.isDev ? 1 : 2,
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
