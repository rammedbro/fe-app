import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import express from 'express';
import createHttpError from 'http-errors';
import {
  getViteConfig,
  createDevServer,
  loadModule, ViteMode,
} from '@imolater/fe-app-build';
import { getConfig } from '@imolater/fe-app-config';
import type { Config, ConfigJson } from '@imolater/fe-app-config';
import type { FEAppConfig, Configs } from '@imolater/fe-app-types';
import { getApplication, getLogger, createSentryRelease } from '@/services';
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
  // TODO: Убрать config, logger в application
  const config = getConfig(loadModule('config.json'));
  const logger = getLogger({ extra: { pid: process.pid } });
  const app = getApplication(config, logger);
  const env = config.env() as ViteMode;
  const viteConfig = await getViteConfig(env, config);
  const { configs } = viteConfig.build.meta;
  const { outDir, assetsDir } = viteConfig.build;
  const assetsPath = path.join(outDir, assetsDir);
  const assetsRoute = `/${ assetsDir }`;
  let indexHtml = readFileSync(path.join(outDir, 'index.html'), 'utf-8');

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
          logger.info({ data: `Sentry release ${ release } is sent.` });
        })
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
    const clientConfig = loadModule<(config: Config) => ConfigJson>(configs.clientConfig);

    indexHtml = indexHtml.replace(
      '<head>',
      `<head><script>const __CONFIG__  = ${JSON.stringify(clientConfig(config))}</script>`,
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

  // Server running
  app.listen();
}

/**
 * Запуск сервера в режиме development
 *
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<void>}
 */
export async function dev(configs: Configs = {}) {
  const config = getConfig(loadModule('config.json'));
  const logger = getLogger({ extra: { pid: process.pid } });
  const app = getApplication(config, logger, configs);
  const vite = await createDevServer(configs);

  // Middlewares
  app.use(vite.middlewares);

  // Server running
  app.listen();
}