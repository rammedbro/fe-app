import { readFileSync } from 'node:fs';
import path from 'node:path';
import express from 'express';
import createHttpError from 'http-errors';
import {
  getViteConfig,
  createDevServer,
  loadModule,
  type ViteMode,
} from '@imolater/fe-app-build';
import type { Config, ConfigJson } from '@imolater/fe-app-config';
import type { FEAppConfig, Configs } from '@imolater/fe-app-types';
import { getApplication, createSentryRelease } from '@/services';
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
export async function start(): Promise<void> {
  const app = getApplication();
  const env = app.config.env() as ViteMode;
  const viteConfig = await getViteConfig(env, app.config);
  const { configs } = viteConfig.build.meta;
  const { outDir, assetsDir } = viteConfig.build;
  const assetsPath = path.join(outDir, assetsDir);
  const assetsRoute = `/${ assetsDir }`;
  let indexHtml = readFileSync(path.join(outDir, 'index.html'), 'utf-8');

  if (configs.feAppConfig) {
    const feAppConfig = loadModule<FEAppConfig>(configs.feAppConfig);

    if (feAppConfig.logLevel === 'all') {
      app.use(logMiddleware(app.logger));
    }

    if (feAppConfig.server?.metrics) {
      // const metric = getMetric(config, app.logger);
      app.use(httpMetricMiddleware(app.logger));
    }

    if (feAppConfig.server?.sentry && app.config.prod()) {
      createSentryRelease(
        {
          silent: feAppConfig.logLevel !== 'all',
          ...feAppConfig.server.sentry,
        },
        {
          env,
          outDir,
          assetsDir,
        })
        .then((release) => {
          app.logger.info({ data: `Sentry release ${ release } is sent.` });
        })
        .catch(e => app.logger.error({
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
    const clientConfig = loadModule<(config: Config) => ConfigJson>(configs.clientConfig);

    indexHtml = indexHtml.replace(
      '<head>',
      `<head><script>const __CONFIG__  = ${ JSON.stringify(clientConfig(app.config)) }</script>`,
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
  app.use(clientErrorMiddleware(app.logger, indexHtml));
  app.use(serverErrorMiddleware(app.logger, indexHtml));

  // Server running
  app.listen();
}

/**
 * Запуск сервера в режиме development
 *
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<void>}
 */
export async function dev(configs: Configs = {}): Promise<void> {
  const app = getApplication(configs);
  const vite = await createDevServer(configs);

  // Middlewares
  app.use(vite.middlewares);

  // Server running
  app.listen();
}
