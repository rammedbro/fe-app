import onFinished from 'on-finished';
import type { RequestHandler } from 'express';
import type { ServerResponse } from 'http';
import type { Logger } from '@imolater/fe-app-types';

export function logMiddleware(logger: Logger): RequestHandler<ServerResponse> {
  return async (req, res, next) => {
    onFinished(res, () => {
      const { url, baseUrl, originalUrl, query, params, path, method, headers } = req;

      logger.info({
        name: 'Server Logger',
        data: {
          request: {
            url,
            baseUrl,
            originalUrl,
            query,
            params,
            path,
            method,
            headers,
          },
          response: {
            code: res.statusCode.toString(),
            message: res.statusMessage,
            headers: res.getHeaders(),
          },
        },
      });
    });

    next();
  };
}
