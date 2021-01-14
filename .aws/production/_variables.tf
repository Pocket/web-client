# This file defines the variables which are strongly typed
variable "repo_name" {
  description = "Name of the repository"
  type        = string
}

variable "domain_name" {
  description = "Name of the domain"
  type        = string
}

variable "environment" {
  description = "The environment we are using for deployment"
  type        = string
}

variable "service_hash" {
  description = "The hash of the git branch used to deploy"
  default     = null
  type        = string
}

variable "iam_stack" {
  description = "Roles for aws (pulled from cloud formation)"
  default     = null
  type        = string
}

variable "legacy_lb_tg_arn" {
  description = "ARN for legacy web"
  type        = string
  default     = "arn:aws:elasticloadbalancing:us-east-1:996905175585:targetgroup/Web-Prod-Public/d8ba379efa742b8c"
}