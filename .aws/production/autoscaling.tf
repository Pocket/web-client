# -----------------------------------------------------------------
# AutoScaling
# Autoscaling defines how we should be scaling services up/down
# Most of the values are defined in local context (main.tf)
# -----------------------------------------------------------------

# Define the target to auto scale
resource "aws_appautoscaling_target" "public_autoscaling_target" {
  max_capacity       = local.repo_context.max_tasks
  min_capacity       = local.repo_context.min_tasks
  resource_id        = "service/${aws_ecs_cluster.ecs-cluster.name}/${aws_ecs_service.public.name}"
  role_arn           = data.aws_cloudformation_export.service_autoscaling_role_arn.value
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

# This defines how we scale services up when load is high
resource "aws_appautoscaling_policy" "public_scale_out_policy" {
  name               = "${local.repo_context.name}-ScaleOutPolicy"
  policy_type        = "StepScaling"
  resource_id        = aws_appautoscaling_target.public_autoscaling_target.resource_id
  scalable_dimension = aws_appautoscaling_target.public_autoscaling_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.public_autoscaling_target.service_namespace
  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = local.repo_context.scale_out_cooldown
    metric_aggregation_type = "Average"
    step_adjustment {
      metric_interval_lower_bound = 0
      scaling_adjustment          = local.repo_context.tasks_to_scale_out
    }
  }
  depends_on = [
    aws_appautoscaling_target.public_autoscaling_target
  ]
}

# This defines how we scale services down when our services are too much for our load
resource "aws_appautoscaling_policy" "public_scale_in_policy" {
  name               = "${local.repo_context.name}-ScaleInPolicy"
  policy_type        = "StepScaling"
  resource_id        = aws_appautoscaling_target.public_autoscaling_target.resource_id
  scalable_dimension = aws_appautoscaling_target.public_autoscaling_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.public_autoscaling_target.service_namespace
  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = local.repo_context.scale_in_cooldown
    metric_aggregation_type = "Average"
    step_adjustment {
      metric_interval_upper_bound = 0
      scaling_adjustment          = local.repo_context.tasks_to_scale_in
    }
  }
  depends_on = [
    aws_appautoscaling_target.public_autoscaling_target
  ]
}
