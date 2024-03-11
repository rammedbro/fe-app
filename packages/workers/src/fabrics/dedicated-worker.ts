/// <reference lib="dom" />

import type {
  WorkerOptions,
  ClientEventMessage,
  WorkerEventMessage,
} from '@/types/dedicated-worker';

declare const __DEDICATED_WORKER_ASSET_PATH__: string;

/**
 * Класс для работы с веб-воркером
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#dedicated_workers
 */
export class DedicatedWorker {
  private worker: Worker | null = null;
  private readonly events: Map<ClientEventMessage['type'], (payload: any) => void> = new Map();

  /**
   * Запуск воркера
   *
   * @param {WorkerOptions} options
   * @throws {Error}
   */
  run(options?: WorkerOptions) {
    if (!window.Worker) {
      throw new Error('Веб воркеры не поддерживаются данным браузером');
    }

    if (this.worker) {
      throw new Error('Воркер уже запущен. Одновременно возможна работа только одного экземпляра');
    }

    this.worker = new Worker(__DEDICATED_WORKER_ASSET_PATH__);
    this.worker.onmessage = (event: MessageEvent<ClientEventMessage>) => {
      const { type, data } = event.data;
      const callback = this.events.get(type);

      if (!callback) {
        return;
      }

      callback(data);
    };
    this.worker.postMessage({ type: 'install', data: options } as WorkerEventMessage);
  }

  /**
   * Отключение воркера
   *
   * @throws {Error}
   */
  terminate() {
    if (!this.worker) {
      throw new Error('Воркер не запущен');
    }

    this.worker.terminate();
    this.worker = null;
  }

  /**
   * Подписка на события воркера
   *
   * @param {ClientEventMessage['type']} type
   * @param {(payload: any) => void} callback
   */
  on(type: ClientEventMessage['type'], callback: (payload: unknown) => void): void;
  /**
   * Подписка на событие ошибки воркера
   *
   * @param {'error'} type
   * @param {(error: Error) => void} callback
   */
  on(type: 'error', callback: (error: Error) => void): void {
    this.events.set(type, callback);
  }
}

/**
 * Инстанс воркера
 *
 * @type {DedicatedWorker}
 */
export const dedicatedWorker = new DedicatedWorker();
