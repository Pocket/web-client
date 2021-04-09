data "template_file" "dashboard" {
  template = file("files/dashboard.json")
  vars     = {
    ecs_cluster_name            = aws_ecs_cluster.ecs-cluster.name
    ecs_service_name            = aws_ecs_service.public.name
    alb_arn_suffix              = data.aws_alb.web_client.arn_suffix
    target_group_arn_suffix     = aws_alb_target_group.public.arn_suffix
    cpu_scale_out               = local.repo_context.cpu_scale_out
    cpu_scale_in                = local.repo_context.cpu_scale_in
    log_group_prefix            = "/ecs/${local.repo_context.name}/${local.environment}"
    requests_high_threshold     = 50000
    response_max_threshold      = 0.30
  }
}

resource "aws_cloudwatch_dashboard" "dashboard" {
  dashboard_name = local.repo_context.name
  dashboard_body = data.template_file.dashboard.rendered
}