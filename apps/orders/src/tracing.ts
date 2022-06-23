import tracer from 'dd-trace';

tracer.init({
  profiling: true,
  hostname: 'datadog-agent',
  port: 8126,
  logInjection: true,
  env: 'prod',
  service: 'orders',
  version: '0.0.1',
});
