import inspector from 'node:inspector';
import express from 'express';
import { loadModule } from '@imolater/fe-app-build';
import type { Config } from '@imolater/fe-app-config';
import type { Configs, Logger } from '@imolater/fe-app-types';
import type http from 'node:http';

// type SocketEventHandler = (event: string, data: object, socket: socket.Socket) => void;
type Express = Omit<express.Express, 'listen'>;

/**
 * Модифицированный express сервер
 */
interface Application extends Express {
  /**
   * Модифицированный метод listen, принимающий только callback
   *
   * @param {() => void} callback
   * @returns {Server}
   */
  listen: (callback?: () => void) => Server;
  /**
   * Модификация инстанса сервера получаемого при вызове метода listen у инстанса express приложения
   *
   * @param {(server: Server) => void} extend
   */
  extendServer: (extend: (server: Server) => void) => void;
  // /**
  //  * Проксирование запросов к модулю
  //  *
  //  * @param {string} module - Название модуля
  //  * @param {Record<string, RequestHandler>} routes - Проксируемые роуты модуля
  //  * @param {{protocol?: string}} options - Опции
  //  */
  // useRequestProxy: (
  //   routes: Record<string, express.RequestHandler>,
  //   options?: {
  //     /** Протокол по которому выполняется подключение к оригинальному адресу модуля */
  //     protocol?: string;
  //   },
  // ) => void;
  // /**
  //  * Проксирование websocket событий модуля
  //  *
  //  * @param {string} module - Название модуля
  //  * @param {Record<string, SocketEventHandler>} events - Проксируемые события модуля
  //  * @param {{path?: string}} options - Опции
  //  */
  // useSocketProxy: (
  //   events: Record<string, SocketEventHandler>,
  //   options?: {
  //     /** Протокол по которому выполняется подключение к оригинальному адресу модуля */
  //     protocol?: string;
  //     /** Путь по которому слушает websocket сервер */
  //     path?: string;
  //   },
  // ) => void;
}

/**
 * Интерфейс объекта сервера
 */
interface Server extends http.Server {
  /** Получение адреса сервера */
  address: () => string;
}

type ServerConfig = (app: Application) => void;

// TODO: Сделать свою абстракцию над express app
export function getApplication(
  config: Config,
  logger: Logger,
  configs: Configs = {},
) {
  const app = express() as unknown as Application;

  /**
   *
   * @param extend
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
  // addModuleRequestProxy(module, routes, options) {
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
  // },

  // TODO: Реализовать прокси к socket соединениям
  // addModuleSocketProxy(module, events, options) {
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
  // },

  /**
   * Подключаем парсер для доступа к телу запроса
   */
  app.use(express.json());

  /**
   * Модифицируем приложение
   */
  const port = config.docker() ? 8080 : config.get('host.port') as number;
  const listen = (app.listen as express.Express['listen']).bind(app);
  app.listen = (callback) => listen(port, '0.0.0.0', callback) as Server;

  /**
   * Подключаем middlewares пользователя
   */
  if (configs.serverConfig) {
    const serverConfig = loadModule<ServerConfig>(configs.serverConfig, { compile: true });

    serverConfig(app);
  }

  /**
   * Модифицируем сервер
   */
  app.extendServer(server => {
    /** Унифицируем ответ метода address */
    server.address = () => `http://localhost:${ port }`;

    /**
     * Подписываемся на события сервера
     */
    server.on('listening', () => {
      logger.info({ data: `Http server is listening on ${ server.address() }` });
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
      logger.info({ data: 'Http server is shutdown' }),
    );

    if (config.get('inspector.enable')) {
      const port = config.docker() ? 8090 : config.get('inspector.port') as number;

      inspector.open(port, '0.0.0.0');
      logger.info({ data: `Inspector is listening on ${ inspector.url() }` });
    }
  });

  return app;
}
