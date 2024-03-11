import type http from 'node:http';
import type express from 'express';
import type socket from 'socket.io';
import type { HostConfig } from '@/config';

type SocketEventHandler = (event: string, data: object, socket: socket.Socket) => void;
type Express = Omit<express.Express, 'listen'>;

/**
 * Интерфейс класса конфига
 */
export interface Config {
  host: HostConfig;
  inspector: {
    enable: boolean;
    port: number;
  };

  prod(): boolean;

  dev(): boolean;

  docker(): boolean;
}

/**
 * Модифицированный express сервер
 */
export interface Application extends Express {
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
  /**
   * Проксирование запросов к модулю
   *
   * @param {string} module - Название модуля
   * @param {Record<string, RequestHandler>} routes - Проксируемые роуты модуля
   * @param {{protocol?: string}} options - Опции
   */
  useRequestProxy: (
    routes: Record<string, express.RequestHandler>,
    options?: {
      /** Протокол по которому выполняется подключение к оригинальному адресу модуля */
      protocol?: string;
    },
  ) => void;
  /**
   * Проксирование websocket событий модуля
   *
   * @param {string} module - Название модуля
   * @param {Record<string, SocketEventHandler>} events - Проксируемые события модуля
   * @param {{path?: string}} options - Опции
   */
  useSocketProxy: (
    events: Record<string, SocketEventHandler>,
    options?: {
      /** Протокол по которому выполняется подключение к оригинальному адресу модуля */
      protocol?: string;
      /** Путь по которому слушает websocket сервер */
      path?: string;
    },
  ) => void;
}

/**
 * Интерфейс объекта сервера
 */
export interface Server extends http.Server {
  /** Получение адреса сервера */
  address: () => string;
}

/**
 * Интерфейс объекта конфигурации сервера
 */
export type ServerConfig = (app: Application) => void;
