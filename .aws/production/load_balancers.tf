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
resource "aws_alb_listener_rule" "public_forward" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/discover-noop/dynamic/url/*",
        "/discover-noop/static/url/",
      ]
    }
  }

  priority = 2001
}

resource "aws_alb_listener_rule" "public_forward_3" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/pocket-hits-signup",
        "/en/explore/pocket-hits-signup",
        "/de/explore/pocket-hits-signup",
      ]
    }
  }

  priority = 2003
}

resource "aws_alb_listener_rule" "public_forward_4" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore",
        "/explore/",
      ]
    }
  }

  priority = 2004
}

# This Points to assets for the legacy repo
resource "aws_alb_listener_rule" "public_forward_5" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.legacy.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/assets/*",
      ]
    }
  }

  priority = 2005
}

# This Points to the legacy repo
resource "aws_alb_listener_rule" "public_forward_eoy_2020" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.legacy.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/Best-of-2020",
        "/explore/best-of-2020",
        "/explore/2020-in-review",
        "/explore/best-articles-2020",
      ]
    }
  }

  priority = 2007
}

# This can be removed once topic pages go live as it will be caught in the catch
# all rule
resource "aws_alb_listener_rule" "public_forward_8" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/coronavirus",
      ]
    }
  }

  priority = 2008
}

# 2009 is currently in use.  Once this route 2010 is in place we can adjust it
# to be 2009 and remove 2010.  This is done to avoid service outages
resource "aws_alb_listener_rule" "public_forward_10" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/item/*",
      ]
    }
  }

  priority = 2010
}

# We are redirecting trending and must reads to explore home (with query params)
resource "aws_alb_listener_rule" "public_forward_11" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type = "redirect"
    redirect {
      port        = "443"
      host        = "getpocket.com"
      path        = "/explore"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
      query = "#{query}"
    }
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/must-reads",
        "/explore/trending",
      ]
    }
  }

  priority = 2011
}

# This Points to the legacy repo
resource "aws_alb_listener_rule" "public_forward_12" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.legacy.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/best-articles-2019",
        "/explore/2016-in-review",
        "/explore/2017-in-review",
        "/explore/2018-in-review",
      ]
    }
  }

  priority = 2013
}

# This Points to the legacy repo
resource "aws_alb_listener_rule" "public_forward_13" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.legacy.arn
  }


  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/pocket-hits",
        "/explore/pocket-hits/*", # this is all the pocket-hits pages
        "/explore/rss/pocket-hits",
      ]
    }
  }

  priority = 2014
}

resource "aws_alb_listener_rule" "public_forward_14" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        // these are static ad manifest files that must be served from the getpocket.com root
        "/ads.txt",
        "/sellers.json",
      ]
    }
  }

  priority = 2015
}

resource "aws_alb_listener_rule" "public_forward_15" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/contact-info",
        "/privacy",
        "/privacy/"
      ]
    }
  }

  priority = 2016
}

# We are redirecting legacy contact to contact-info
resource "aws_alb_listener_rule" "public_forward_16" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type = "redirect"
    redirect {
      port        = "443"
      host        = "getpocket.com"
      path        = "/contact-info"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
      query = "#{query}"
    }
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/contact",
        "/contact/",
      ]
    }
  }

  priority = 2017
}

resource "aws_alb_listener_rule" "public_forward_17" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/tos",
        "/tos/",
        "/jobs",
        "/jobs/"
      ]
    }
  }

  priority = 2018
}

resource "aws_alb_listener_rule" "public_forward_18" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/pocket-hits",
        "/pocket-hits/*",
      ]
    }
  }

  priority = 2019
}

resource "aws_alb_listener_rule" "public_forward_19" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/en/pocket-hits",
        "/en/pocket-hits/*",
        "/de-DE/pocket-hits",
        "/de-DE/pocket-hits/*",
      ]
    }
  }

  priority = 2020
}

resource "aws_alb_listener_rule" "public_forward_21" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/pocket-and-firefox",
        "/*/pocket-and-firefox",
        "/save-to-pocket",
        "/*/save-to-pocket",
      ]
    }
  }

  priority = 2021
}

# We are redirecting legacy firefox learn more routes to pocket-and-firefox
resource "aws_alb_listener_rule" "public_forward_22" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type = "redirect"
    redirect {
      port        = "443"
      host        = "getpocket.com"
      path        = "/pocket-and-firefox"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
      query       = "#{query}"
    }
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/firefox",
        "/firefox/",
        "/firefox_learnmore",
        "/firefox_learnmore/"
      ]
    }
  }

  priority = 2022
}

# We are redirecting productivity to self improvement
resource "aws_alb_listener_rule" "public_forward_23" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type = "redirect"
    redirect {
      port        = "443"
      host        = "getpocket.com"
      path        = "/explore/self-improvement"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
      query       = "#{query}"
    }
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/productivity/",
        "/explore/productivity"
      ]
    }
  }

  priority = 2023
}

# We are redirecting finance to business
resource "aws_alb_listener_rule" "public_forward_24" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type = "redirect"
    redirect {
      port        = "443"
      host        = "getpocket.com"
      path        = "/explore/business"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
      query       = "#{query}"
    }
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/explore/finance/",
        "/explore/finance"
      ]
    }
  }

  priority = 2024
}

resource "aws_alb_listener_rule" "public_forward_25" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
        "/about",
        "/??/about",
        "/??-*/about"
      ]
    }
  }

  priority = 2025
}


# This is the catch all. Needs to be at the bottom of the routes
resource "aws_alb_listener_rule" "public_forward_100" {
  listener_arn = data.aws_alb_listener.web_client.arn
  action {
    type             = "forward"
    target_group_arn = data.aws_lb_target_group.web_discover.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }

  condition {
    path_pattern {
      values = [
         "/explore/*",
      ]
    }
  }

  priority = 2100
}


# Defining what the the load balancer should expect when routing to
# the containers.
# NOTE: Make sure your application has a route to pulse that returns 200
resource "aws_alb_target_group" "public" {
  health_check {
    interval            = 30
    path                = "/health"
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
