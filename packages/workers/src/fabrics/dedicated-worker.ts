/// <reference lib="dom" />

import type { EventMessage } from '@/types';

declare const __DEDICATED_WORKER_ASSET_PATH__: string;

/**
 * Класс для работы с веб-воркером
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#dedicated_workers
 */
export class DedicatedWorker extends EventTarget {
  worker: Worker | null = null;

  /**
   * Запуск воркера
   *
   * @throws {Error}
   */
  start() {
    if (!window.Worker) {
      throw new Error('Web workers are not supported in your browser!');
    }

    if (this.worker) {
      throw new Error('Worker is already running!');
    }

    this.worker = new Worker(__DEDICATED_WORKER_ASSET_PATH__);
    this.worker.onmessage = (event: MessageEvent<EventMessage>) => this.dispatchEvent(event);
  }

  /**
   * Отключение воркера
   *
   * @throws {Error}
   */
  stop() {
    if (!this.worker) {
      throw new Error('Worker is not running!');
    }

    this.worker.terminate();
    this.worker = null;
  }
}

/**
 * Инстанс воркера
 *
 * @type {DedicatedWorker}
 */
export const dedicatedWorker: DedicatedWorker = new DedicatedWorker();
