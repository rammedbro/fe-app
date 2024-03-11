import createHttpError from 'http-errors';
import type { RequestHandler } from 'express';

export function excludeMiddleware(excluded: string[]): RequestHandler {
  return (req, res, next) => {
    const regexp = new RegExp(`^.*\\.(${excluded.join('|')})$`);
    const isExcluded = Boolean(req.url.match(regexp));

    if (isExcluded) {
      next(createHttpError(404, 'Not found', { path: req.path }));

      return;
    }

    next();
  };
}
