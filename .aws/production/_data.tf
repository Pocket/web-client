# These are params we are saving to AWS for use on future builds
# These will get set in the CircleCi step and consumed by terraform

# Git branch name for the current deployment
data "aws_ssm_parameter" "build_branch" {
  name = "/Web-Client/CircleCI/Production/BUILD_BRANCH"
}

# CircleCI build number
data "aws_ssm_parameter" "service_version" {
  name = "/Web-Client/CircleCI/Production/SERVICE_VERSION"
}

# Git SHA of the branch the current deployment
data "aws_ssm_parameter" "service_hash" {
  name = "/Web-Client/CircleCI/Production/SERVICE_HASH"
}

# Virtual Private Cloud - Pocket internals
data "aws_ssm_parameter" "vpc" {
  name = "/Shared/Vpc"
}

# Shared resource for handling server location/routing
data "aws_ssm_parameter" "private_subnets" {
  name = "/Shared/PrivateSubnets"
}


# These params get pulled in based on what account you run the
# terraform command under

# The aws account reference that is performing the action
data "aws_caller_identity" "current" {}

# The aws region we are running in
data "aws_region" "current" {}


# These params are pulled in fro cloud formation (AWS native config)
data "aws_cloudformation_export" "task_role_arn" {
  name = "${var.iam_stack}-TaskRoleArn"
}

data "aws_cloudformation_export" "task_execution_role_arn" {
  name = "${var.iam_stack}-TaskExecutionRoleArn"
}

data "aws_cloudformation_export" "service_autoscaling_role_arn" {
  name = "${var.iam_stack}-ServiceAutoScalingRoleArn"
}

# This pulls in state file from pocket web production
# this will set us up for future civil unrest
data "terraform_remote_state" "web" {
  backend = "remote"
  config  = {
    organization = "Pocket"
    workspaces   = {
      name = "web-prod"
    }
  }
}

data "aws_security_group" "public_alb_security_group" {
  id = data.terraform_remote_state.web.outputs.public_alb_security_group_id
}

data "aws_lb_target_group" "legacy" {
  arn  = "${var.lb_tg_arn}"
}