import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import createHttpError from 'http-errors';
import consola from 'consola';
import {
  getViteConfig,
  createDevServer,
  loadModule,
  getConfig,
} from '@imolater/fe-app-build';
import type { client, FEAppConfig, Configs } from '@imolater/fe-app-types';
import {
  getApplication,
  getLogger,
  getSentry,
} from '@/services';
import {
  logMiddleware,
  clientErrorMiddleware,
  serverErrorMiddleware,
  httpMetricMiddleware,
  excludeMiddleware,
} from '@/middlewares';

/**
 * Запуск сервера в режиме production
 *
 * @returns {Promise<void>}
 */
export async function runServer(): Promise<void> {
  const config = getConfig();
  const logger = getLogger();
  const app = getApplication(config, logger);
  const viteConfig = await getViteConfig('production');
  const { configs } = viteConfig.build.meta;
  const { outDir, assetsDir } = viteConfig.build;
  const assetsPath = path.join(outDir, assetsDir);
  const assetsRoute = `/${ assetsDir }`;
  const indexHtmlPath = path.join(outDir, 'index.html');
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  if (configs.feAppConfig) {
    const feAppConfig = loadModule<FEAppConfig>(configs.feAppConfig);

    if (feAppConfig.logLevel === 'all') {
      app.use(logMiddleware(logger));
    }

    if (feAppConfig.server?.metrics) {
      // const metric = getMetric(config, logger);
      app.use(httpMetricMiddleware(logger));
    }

    if (feAppConfig.server?.sentry && config.prod()) {
      const sentry = getSentry('production', {
        silent: feAppConfig.logLevel !== 'all',
        ...feAppConfig.server.sentry,
      });

      sentry.createRelease()
        .then((release) => consola.success(`Sentry release ${ release } is sent.`))
        .catch(e => logger.error({
          name: 'Server Error',
          data: {
            code: '500',
            message: e.message,
            data: { error: e },
          },
        }));

      app.use(assetsRoute, excludeMiddleware(['js.map']));
    }
  }

  if (configs.clientConfig) {
    const appConfigFn = loadModule<client.ClientConfig>(configs.clientConfig);

    indexHtml = indexHtml.replace(
      '<head>',
      '<head><script>window.___config =' + JSON.stringify(appConfigFn(config)) + '</script>',
    );
  }

  // Middlewares
  app.use(assetsRoute, express.static(assetsPath, {
    index: false,
    fallthrough: false,
  }));

  // Routes
  app.get('/', (req, res) => {
    res.status(200).send(indexHtml);
  });
  app.get('*', (req, res, next) => {
    req.headers.accept?.includes('text/html')
      ? res.status(200).send(indexHtml)
      : next(createHttpError(404, 'Not found', { path: req.path }));
  });

  // Error handlers
  app.use(clientErrorMiddleware(logger, indexHtml));
  app.use(serverErrorMiddleware(logger, indexHtml));

  app.listen();
}

/**
 * Запуск сервера в режиме development
 *
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<void>}
 */
export async function runDevServer(configs: Configs = {}) {
  const config = getConfig();
  const logger = getLogger();
  const app = getApplication(config, logger, configs);
  const vite = await createDevServer(configs);
  const { publicDir } = vite.config;
  const { assetsDir } = vite.config.build;
  const assetsPath = path.join(publicDir, assetsDir);

  // Middlewares
  app.use(`/${ assetsDir }`, express.static(assetsPath));
  app.use(vite.middlewares);

  app.listen();
}
