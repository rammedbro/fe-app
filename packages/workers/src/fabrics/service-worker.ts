/* eslint-disable no-console */
/// <reference lib="dom" />

declare const __SERVICE_WORKER_ASSET_PATH__: string;

/**
 * Класс для работы с service worker
 */
export class ServiceWorker extends EventTarget {
  worker: ServiceWorkerRegistration | null = null;

  /**
   * Запуск воркера
   *
   * @throws {Error}
   */
  async start() {
    if (!navigator.serviceWorker) {
      throw new Error('Service workers are not supported in your browser!');
    }

    if (this.worker) {
      throw new Error('Worker is already running!');
    }

    try {
      this.worker = await navigator.serviceWorker.register(__SERVICE_WORKER_ASSET_PATH__);

      if (this.worker.installing) {
        console.log('Service worker installing');
      } else if (this.worker.waiting) {
        console.log('Service worker installed');
      } else if (this.worker.active) {
        this.worker.active.addEventListener('message', this.dispatchEvent);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Отключение воркера
   *
   * @throws {Error}
   */
  async stop() {
    if (!this.worker) {
      throw new Error('Worker is not running!');
    }

    await this.worker.unregister();
    this.worker = null;
  }
}

/**
 * Инстанс воркера
 *
 * @type {DedicatedWorker}
 */
export const serviceWorker = new ServiceWorker();
