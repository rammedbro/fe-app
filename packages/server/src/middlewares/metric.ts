import { join } from 'node:path';
import type { RequestHandler } from 'express';
import type { Logger } from '@imolater/fe-app-types';

export function httpMetricMiddleware(logger: Logger): RequestHandler {
  return (req, res, next) => {
    const start = Date.now();

    req.on('close', () => {
      try {
        const duration = Date.now() - start;
        const path = join(
          'http',
          req.method.toLowerCase(),
          req.path,
        );

        logger.info({
          name: 'Metric',
          data: { path, duration },
        });
      } catch (e) {
        logger.error({
          name: 'Server Error',
          data: {
            code: '500',
            message: (e as Error).message,
            error: e,
          },
        });
      }
    });

    next();
  };
}
