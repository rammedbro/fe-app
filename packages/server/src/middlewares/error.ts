import consola from 'consola';
import type { ErrorRequestHandler } from 'express';
import type { Logger } from '@imolater/fe-app-types';

type ErrorMiddleware = (logger: Logger, template: string) => ErrorRequestHandler;

type ClientError = Error & {
  statusCode?: number,
  statusMessage?: string
};

export const clientErrorMiddleware: ErrorMiddleware = (logger, template) => {
  return (e: ClientError, req, res, next) => {
    const code = req.statusCode || e.statusCode;

    if (!code) {
      next(e);

      return;
    }

    try {
      logger.error({
        name: 'Client Error',
        data: {
          code: code.toString(),
          message: req.statusMessage,
          error: e,
        },
      });

      res.status(code).send(template);
    } catch (e) {
      next(e);
    }
  };
};

export const serverErrorMiddleware: ErrorMiddleware = (logger, template) => {
  return (e: Error, req, res) => {
    try {
      logger.error({
        name: 'Server Error',
        data: {
          code: '500',
          message: e.message,
          error: e,
        },
      });
    } catch (e) {
      consola.error(e);
    } finally {
      res.status(500).send(template);
    }
  };
};
