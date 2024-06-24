import { Construct } from 'constructs'

import { config } from './config'

import {
  App,
  S3Backend,
  Aspects,
  MigrateIds,
  DataTerraformRemoteState,
  TerraformStack
} from 'cdktf';

import { ArchiveProvider } from '@cdktf/provider-archive/lib/provider';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { DataAwsRegion } from '@cdktf/provider-aws/lib/data-aws-region';
import { DataAwsCallerIdentity } from '@cdktf/provider-aws/lib/data-aws-caller-identity';
import { DataAwsSnsTopic } from '@cdktf/provider-aws/lib/data-aws-sns-topic';
import { DataAwsKmsAlias } from '@cdktf/provider-aws/lib/data-aws-kms-alias';
import { LocalProvider } from '@cdktf/provider-local/lib/provider';
import { NullProvider } from '@cdktf/provider-null/lib/provider';
import { PagerdutyProvider } from '@cdktf/provider-pagerduty/lib/provider';
import { PocketALBApplication, PocketECSCodePipeline, PocketPagerDuty, PocketVPC } from '@pocket-tools/terraform-modules';
import * as fs from 'fs';

class WebClient extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    new AwsProvider(this, 'aws', { region: 'us-east-1' })
    new PagerdutyProvider(this, 'pagerduty_provider', { token: undefined })
    new NullProvider(this, 'null-provider')
    new LocalProvider(this, 'local-provider')
    new ArchiveProvider(this, 'archive-provider')
    new S3Backend(this, {
      bucket: `mozilla-pocket-team-${config.environment.toLowerCase()}-terraform-state`,
      dynamodbTable: `mozilla-pocket-team-${config.environment.toLowerCase()}-terraform-state`,
      key: config.name,
      region: 'us-east-1'
    })

    const pocketVPC = new PocketVPC(this, 'pocket-vpc')
    const region = new DataAwsRegion(this, 'region')
    const caller = new DataAwsCallerIdentity(this, 'caller')
    const snsTopic = this.getCodeDeploySnsTopic()
    const secretsManagerKmsAlias = this.getSecretsManagerKmsAlias()
    const pagerDuty = this.createPagerDuty()

    const webApp = this.createWebAlbApplication({
      pagerDuty,
      secretsManagerKmsAlias,
      snsTopic,
      region,
      caller,
      vpc: pocketVPC
    })

    this.createApplicationCodePipeline(webApp, 'Web')

    const pocketApp = this.createPocketAlbApplication({
      pagerDuty,
      secretsManagerKmsAlias,
      snsTopic,
      region,
      caller,
      vpc: pocketVPC
    })

    this.createApplicationCodePipeline(pocketApp, 'Pocket')

    // Pre cdktf 0.17 ids were generated differently so we need to apply a migration aspect
    // https://developer.hashicorp.com/terraform/cdktf/concepts/aspects
    Aspects.of(this).add(new MigrateIds())
  }

  /**
   * Get the sns topic for code deploy
   * @private
   */
  private getCodeDeploySnsTopic() {
    return new DataAwsSnsTopic(this, 'frontend_notifications', {
      name: `Frontend-${config.environment}-ChatBot`
    })
  }

  /**
   * Get secrets manager kms alias
   * @private
   */
  private getSecretsManagerKmsAlias() {
    return new DataAwsKmsAlias(this, 'kms_alias', {
      name: 'alias/aws/secretsmanager'
    })
  }

  /**
   * Create CodePipeline to build and deploy terraform and ecs
   * @param app
   * @private
   */
  private createApplicationCodePipeline(app: PocketALBApplication, appName: string) {
    new PocketECSCodePipeline(this, `code-pipeline-${appName}`, {
      prefix: `${config.prefix}-${appName}`,
      source: {
        codeStarConnectionArn: config.codePipeline.githubConnectionArn,
        repository: config.codePipeline.repository,
        branchName: config.codePipeline.branch
      }
    })
  }

  /**
   * Create PagerDuty service for alerts
   * @private
   */
  private createPagerDuty(): PocketPagerDuty | undefined {
    if (config.isDev) {
      //Dont create pagerduty services for a dev service.
      return null
    }

    const incidentManagement = new DataTerraformRemoteState(this, 'incident_management', {
      organization: 'Pocket',
      workspaces: {
        name: 'incident-management'
      }
    })

    return new PocketPagerDuty(this, 'pagerduty', {
      prefix: config.prefix,
      service: {
        criticalEscalationPolicyId: incidentManagement
          .get('policy_experience_critical_id')
          .toString(),
        nonCriticalEscalationPolicyId: incidentManagement
          .get('policy_experience_critical_id')
          .toString()
      }
    })
  }

  private createWebAlbApplication(dependencies: {
    pagerDuty: PocketPagerDuty
    region: DataAwsRegion
    caller: DataAwsCallerIdentity
    secretsManagerKmsAlias: DataAwsKmsAlias
    snsTopic: DataAwsSnsTopic
    vpc: PocketVPC
  }): PocketALBApplication {
    const { pagerDuty, region, caller, secretsManagerKmsAlias, snsTopic, vpc } = dependencies

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

  private createPocketAlbApplication(dependencies: {
    pagerDuty: PocketPagerDuty
    region: DataAwsRegion
    caller: DataAwsCallerIdentity
    secretsManagerKmsAlias: DataAwsKmsAlias
    snsTopic: DataAwsSnsTopic
    vpc: PocketVPC
  }): PocketALBApplication {
    const { pagerDuty, region, caller, secretsManagerKmsAlias, snsTopic, vpc } = dependencies

    return new PocketALBApplication(this, 'application-pocket', {
      prefix: `${config.prefix}-Pocket`,
      alb6CharacterPrefix: config.shortName,
      tags: config.tags,
      cdn: false,
      internal: false,
      domain: config.pocketDomain,
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
            // TODO: Replace with a realy health check
            command: ['CMD-SHELL', 'curl -f http://localhost/ || exit 1'],
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
const stack = new WebClient(app, 'web-client');
const tfEnvVersion = fs.readFileSync('.terraform-version', 'utf8');
stack.addOverride('terraform.required_version', tfEnvVersion);
app.synth()
