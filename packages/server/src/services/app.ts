import inspector from 'node:inspector';
import express from 'express';
import consola from 'consola';
import { loadModule } from '@imolater/fe-app-build';
import type { Configs, Logger, server } from '@imolater/fe-app-types';

export function getApplication(
  config: server.Config,
  logger: Logger,
  configs: Configs = {},
) {
  const app = createApplication(config);

  if (configs.serverConfig) {
    const serverConfig = loadModule<server.ServerConfig>(configs.serverConfig, { compile: true });

    serverConfig(app);
  }

  // Подписываемся на события сервера
  app.extendServer(server => {
    server.on('listening', () => {
      consola.success(`Http server is listening on ${ server.address() }`);
    });
    server.on('error', (e) =>
      logger.error({
        name: 'Server Error',
        data: {
          code: '500',
          message: (e as Error).message,
          error: e,
        },
      }),
    );
    server.on('close', () =>
      consola.success('Http server is shutdown'),
    );
  });

  if (config.inspector.enable) {
    app.extendServer(() => {
      const port = config.docker() ? 8090 : config.inspector.port as number;

      inspector.open(port, '0.0.0.0');
      consola.success(`Inspector is listening on ${ inspector.url() }`);
    });
  }

  return app;
}

/**
 * Создание инстанса express приложения
 *
 * @param {AmConfig} config
 * @returns {ExpressApp}
 */
function createApplication(config: server.Config) {
  // TODO: Переделать способ задания объекта app(e.g. Object.create)
  const app = express() as unknown as server.Application;

  /**
   * Подключаем парсер для доступа к телу запроса
   */
  app.use(express.json());

  /**
   * Добавляем методы
   */
  app.extendServer = (extend) => {
    const listen = app.listen;

    app.listen = (...args: any[]) => {
      const server = listen.call(app, ...args);

      extend(server);

      return server;
    };
  };
  // TODO: Реализовать прокси к http запросам
  // app.addModuleRequestProxy = (module, routes, options) => {
  //   if (!modules.has(module)) {
  //     throw new Error(`Модуль ${ module } не найден в списке модулей`);
  //   }
  //
  //   const opts = merge({ protocol: 'https' }, options);
  //   const mockModulesPath = `mocks/modules/${ module }`;
  //
  //   // Подменяем ссылки на модуль в app.config
  //   config['modulesUrl'][module] = `localhost:${ config.get('host.port') }/${ mockModulesPath }`;
  //
  //   // Слушаем запросы к модулю и проксируем их
  //   app.all(`/${ mockModulesPath }/*`, (req, res, next) => {
  //     const route = '/' + (req.params as Record<string, string>)[0];
  //     const handler = routes[route];
  //
  //     if (handler) {
  //       handler(req, res, next);
  //     } else {
  //       // Редирект на первоначальный url
  //       const originalUrl = `${ opts.protocol }://` + modules.get(module);
  //       const url = new URL(route, originalUrl);
  //
  //       res.redirect(307, url.toString());
  //     }
  //   });
  // };

  // TODO: Реализовать прокси к socket соединениям
  // app.addModuleSocketProxy = (module, events, options) => {
  //   if (!modules.has(module)) {
  //     throw new Error(`Модуль ${ module } не найден в списке модулей`);
  //   }
  //
  //   app.extendServer(server => {
  //     const opts = merge({ protocol: 'https', path: '/socket' }, options);
  //     // Создаем прокси wss по пути path
  //     const proxy = new io.Server(server, {
  //       path: opts.path,
  //     });
  //
  //     // Слушаем входящие сообщения к прокси wss
  //     proxy.on('connection', (socket) => {
  //       const proxyUrl = new URL(opts.path, server.address());
  //       consola.success(`Websocket server is listening on ${ proxyUrl.toString() }`);
  //
  //       // Создаем ws соединение по оригинальному адресу модуля
  //       const moduleOriginalUrl = `${ opts.protocol }://` + modules.get(module);
  //       const original = ioClient(moduleOriginalUrl, {
  //         path: opts.path,
  //         query: socket.handshake.query,
  //       });
  //
  //       // Подключаемся к оригинальному wss
  //       original.connect();
  //       // Слушаем события оригинального wss и шлем их обратно на client
  //       original.onAny((event: string, ...args) => socket.emit(event, ...args));
  //       // Слушаем события client и проксируем их
  //       socket.onAny((event: string, data: object) => {
  //         const handler = events[event];
  //
  //         if (handler) {
  //           handler(event, data, socket);
  //         } else {
  //           original.emit(event, data);
  //         }
  //       });
  //
  //       socket.on('disconnect', () => {
  //         original.disconnect();
  //
  //         consola.success('Websocket server is shutdown');
  //       });
  //     });
  //   });
  // };

  /**
   * Модифицируем приложение
   */
  // Привязываем хост и порт
  const port = config.docker() ? 8080 : config.host.port as number;
  const listen = (app.listen as express.Express['listen']).bind(app);
  app.listen = (callback) => listen(port, '0.0.0.0', callback) as server.Server;

  /**
   * Модифицируем сервер
   */
  app.extendServer((server) => {
    // Унифицируем ответ метода address
    server.address = () => `http://localhost:${ port }`;
  });

  return app;
}

