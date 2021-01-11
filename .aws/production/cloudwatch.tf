# -----------------------------------------------------------------
# Cloudwatch
# Cloudwatch allows monitoring of our services and what actions
# to take when traffic dictates scaling (up/down) of those services
# -----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "web-client-agent" {
  name              = "/ecs/web-client/${var.environment}/apache"
  retention_in_days = 30
}

# This defines what we do when CPU utilization is running high
# In this instance we scale up to meet demand
resource "aws_cloudwatch_metric_alarm" "public_scale_out_alarm" {
  alarm_name          = "${local.repo_context.name} Service High CPU"
  alarm_description   = "Alarm to add capacity if CPU is high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  threshold           = local.repo_context.cpu_scale_out
  statistic           = "Average"
  period              = 60
  namespace           = "AWS/ECS"
  metric_name         = "CPUUtilization"
  treat_missing_data  = "notBreaching"
  dimensions = {
    ClusterName = aws_ecs_cluster.ecs-cluster.name
    ServiceName = aws_ecs_service.public.name
  }
  alarm_actions = [
    aws_appautoscaling_policy.public_scale_out_policy.arn
  ]
  tags = local.tags
}

# This defines what we do when CPU utilization is low 
# In this instance we scale back to save cost
resource "aws_cloudwatch_metric_alarm" "public_scale_in_alarm" {
  alarm_name          = "${local.repo_context.name} Service Low CPU"
  alarm_description   = "Alarm to reduce capacity if container CPU is low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  threshold           = local.repo_context.cpu_scale_in
  statistic           = "Average"
  period              = 60
  namespace           = "AWS/ECS"
  metric_name         = "CPUUtilization"
  treat_missing_data  = "notBreaching"
  dimensions = {
    ClusterName = aws_ecs_cluster.ecs-cluster.name
    ServiceName = aws_ecs_service.public.name
  }
  alarm_actions = [
    aws_appautoscaling_policy.public_scale_in_policy.arn
  ]
  tags = local.tags
}
