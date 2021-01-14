# Terraform supports multiple providers.  We are using Amazon Web Services
provider "aws" {
  region = "us-east-1"
}

# Defining our Terraform Settings
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  backend "remote" {
    organization = "Pocket"
    hostname     = "app.terraform.io"

    workspaces {
      prefix = "web-client-"
    }
  }
}

# These are variables we will be using across the project
locals {
  repo_context = {
    name               = "${var.repo_name}-${var.environment}"
    min_tasks          = 5
    max_tasks          = 30
    cpu_scale_in       = 25
    cpu_scale_out      = 50
    tasks_to_scale_out = 4
    tasks_to_scale_in  = -1
    scale_out_cooldown = 60
    scale_in_cooldown  = 60
  }

  # Service Hash is the git SHA of what is currently deployed
  # This can be set in the command line or pulled in from paramater storage
  service_hash = var.service_hash == null ? data.aws_ssm_parameter.service_hash.value : var.service_hash

  # Service version is the CircleCI build number
  service_version = data.aws_ssm_parameter.service_version.value

  # Build branch is the branch that production deploys are made from 
  # 99.99999% of the time this will be master until we adjust deployment pattern
  build_branch = data.aws_ssm_parameter.build_branch.value

  # These are added to aws resources so we have clear metrics on
  # individual resources (cost, uptime, funkytime)
  tags = {
    service         = var.repo_name
    environment     = var.environment
    service_hash    = local.service_hash
    service_version = local.service_version
    build_branch    = local.build_branch
  }
}
