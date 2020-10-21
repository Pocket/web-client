# -----------------------------------------------------------------
# Elastic Container Service
# Elastic containers are where the application runs. These scale
# up and down to handle demand based on autoscaling definitions
# -----------------------------------------------------------------

module "web-client" {
  source          = "cloudposse/ecs-container-definition/aws"
  version         = "0.21.0"
  essential       = true
  container_name  = "web-client-apache"
  container_image = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.repo_name}:${local.service_hash}"
  log_configuration = {
    logDriver     = "awslogs"
    secretOptions = []
    options = {
      awslogs-region        = data.aws_region.current.name
      awslogs-group         = aws_cloudwatch_log_group.web-client-agent.name
      awslogs-stream-prefix = "ecs"
    }
  }
  environment = [
    {
      name  = "DOMAIN"
      value = var.domain_name
    },
    {
      name  = "ASSET_PREFIX"
      value = "https://assets.getpocket.com/web-client"
    },
  ]
  container_cpu                = null
  container_memory             = null
  container_memory_reservation = null
}

# Define resources available to each container
resource "aws_ecs_task_definition" "public" {
  family                = local.repo_context.name
  task_role_arn         = data.aws_cloudformation_export.task_role_arn.value
  execution_role_arn    = data.aws_cloudformation_export.task_execution_role_arn.value
  network_mode          = "awsvpc"
  cpu                   = 4096
  memory                = 8192
  container_definitions = "[${module.web-client.json_map}]"
  requires_compatibilities = [
    "FARGATE" # This is Amazons service to autmoate provisioning
  ]
  tags = local.tags
}

# Define the cluster the containers will be associated with
resource "aws_ecs_cluster" "ecs-cluster" {
  name = local.repo_context.name
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  tags = local.tags
}

# Service we are running inside the ECS cluster
resource "aws_ecs_service" "public" {
  name            = local.repo_context.name
  task_definition = aws_ecs_task_definition.public.arn
  cluster         = aws_ecs_cluster.ecs-cluster.arn
  network_configuration {
    subnets = split(",", data.aws_ssm_parameter.private_subnets.value)
    security_groups = [
      aws_security_group.ecs_security_group.id
    ]
  }
  launch_type                        = "FARGATE"
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  desired_count                      = local.repo_context.min_tasks
  # Optional: Allow external changes without Terraform plan difference
  lifecycle {
    ignore_changes = [
      desired_count
    ]
  }
  load_balancer {
    container_name   = "web-client-apache"
    container_port   = 80
    target_group_arn = aws_alb_target_group.public.arn
  }
  depends_on = [
    aws_alb_target_group.public
  ]
  tags = local.tags
}

# This defines availalbe access points for this service
resource "aws_security_group" "ecs_security_group" {
  name        = "${var.repo_name}-ECS Security Group"
  description = "Internal security group"
  vpc_id      = data.aws_ssm_parameter.vpc.value #virtual private cloud .. for secrets
  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "TCP"
    security_groups = [data.aws_security_group.public_alb_security_group.id]
  }
  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "TCP"
    security_groups = [data.aws_security_group.public_alb_security_group.id]
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = -1
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }
  tags = merge(local.tags, {
    Name = "${var.repo_name}-ECS Security Group"
  })
}
