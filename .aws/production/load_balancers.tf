# -----------------------------------------------------------------
# Load Balancers
# These sit in front of our services and distribute requests
# to the appropriate containers (ECS)
# -----------------------------------------------------------------

# We are sharing the load balancer with getpocket.com (Web)
# This is necessary because traffic will be partially routed here
# as we transition away from current web code
# (eventually this will not be the case)
data "aws_alb" "web_client" {
  arn = data.terraform_remote_state.web.outputs.public_alb_arn
}

# We are also sharing the listener for the same reasons outlined above
data "aws_alb_listener" "web_client" {
  arn = data.terraform_remote_state.web.outputs.public_alb_https_listener_arn
}

#TODO: When https://github.com/terraform-providers/terraform-provider-aws/pull/8268 is merged, merge the listener rules together into 1 block.
# Define where the load balancer should route trafffic
resource "aws_alb_listener_rule" "public_forward_101" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.public.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
         "/my-list",
         "/my-list/"
      ]
    }
  }

  priority = 2101
}


# Defining what the the load balancer should expect when routing to
# the containers.
# NOTE: Make sure your application has a route to pulse that returns 200
resource "aws_alb_target_group" "public" {
  health_check {
    interval            = 30
    path                = "/"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 9
  }
  vpc_id               = data.aws_ssm_parameter.vpc.value
  protocol             = "HTTP"
  port                 = 80
  name                 = local.repo_context.name
  target_type          = "ip"
  deregistration_delay = 120
  lifecycle {
    create_before_destroy = true
  }
  depends_on = [
    data.aws_alb.web_client
  ]
  tags = local.tags
}
