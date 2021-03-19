import { Construct } from 'constructs'

import { config } from './config'

import { App } from 'cdktf'
import { DataTerraformRemoteState } from 'cdktf'
import { RemoteBackend } from 'cdktf'
import { TerraformStack } from 'cdktf'

import { AwsProvider } from '../.gen/providers/aws'
import { DataAwsCallerIdentity } from '../.gen/providers/aws'
import { DataAwsKmsAlias } from '../.gen/providers/aws'
import { DataAwsRegion } from '../.gen/providers/aws'
import { DataAwsSnsTopic } from '../.gen/providers/aws'
import { PagerdutyProvider } from '../.gen/providers/pagerduty'

import { PocketALBApplication } from '@pocket/terraform-modules'
import { PocketPagerDuty } from '@pocket/terraform-modules'
import { PocketVPC } from '@pocket/terraform-modules'

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

    const incidentManagement = new DataTerraformRemoteState(
      this,
      'incident_management',
      {
        organization: 'Pocket',
        workspaces: { name: 'incident-management' }
      }
    )

    const pagerDuty = new PocketPagerDuty(this, 'pagerduty', {
      prefix: config.prefix,
      service: {
        criticalEscalationPolicyId: incidentManagement.get(
          'policy_backend_critical_id'
        ),
        nonCriticalEscalationPolicyId: incidentManagement.get(
          'policy_backend_non_critical_id'
        )
      }
    })

    const region = new DataAwsRegion(this, 'region')
    const caller = new DataAwsCallerIdentity(this, 'caller')
    const secretsManager = new DataAwsKmsAlias(this, 'kms_alias', {
      name: 'alias/aws/secretsmanager'
    })

    // !! Create this before deploying
    const snsTopic = new DataAwsSnsTopic(this, 'backend_notifications', {
      name: `Backend-${config.environment}-ChatBot`
    })

    new PocketALBApplication(this, 'application', {
      internal: true,
      prefix: config.prefix,
      alb6CharacterPrefix: config.shortName,
      tags: config.tags,
      cdn: false,
      domain: config.domain,
      containerConfigs: [
        {
          name: 'app',
          hostPort: 80,
          containerPort: 80,
          envVars: [
            {
              name: 'NODE_ENV',
              value: process.env.NODE_ENV // this gives us a nice lowercase production and development
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
          hostPort: 2000,
          containerPort: 2000,
          protocol: 'udp',
          command: ['--region', 'us-east-1', '--local-mode']
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
        // !! pagerDuty.snsNonCriticalAlarmTopic.arn USE this to annoy the backend team
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
    })
  }
}

const app = new App()
new WebClient(app, 'web-client')
app.synth()
