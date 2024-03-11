// TODO: Реализовать сбор серверных метрик
// import type { Config, Logger } from '@imolater/fe-app-types';
//
// export function getMetric(
//   config: Config,
//   logger: Logger,
// ) {
//
//   const metric = statsd.initMetric({
//     ...options,
//     host: config.get('market.statsd.host') || 'localhost',
//     port: config.get('market.statsd.port') || 8126,
//     metricPrefix: config.get('host.metric_path'),
//   });
//   const nodeMetricCollector = new NodeMetricCollector();
//
//   nodeMetricCollector.on('metric', metric.createEventHandler());
//   nodeMetricCollector.on('error', (e) => {
//     logger.error({
//       data: {
//         code: '500',
//         message: (e as Error).message,
//         error: e,
//       },
//     });
//   });
// }
export default {};
