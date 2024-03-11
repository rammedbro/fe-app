/// <reference lib="webworker" />

import type { ClientEventMessage, WorkerEventMessage, WorkerOptions } from '@/types/dedicated-worker';

declare const self: DedicatedWorkerGlobalScope;
declare const __BUILD_META_PATH__: string;

install();

function install() {
  self.onmessage = (event: MessageEvent<WorkerEventMessage>) => {
    const { type, data } = event.data;

    if (type === 'install') {
      runCheckAppUpdateWork(data);
    }
  };
  self.onerror = (event) => {
    event.preventDefault();
    sendErrorMessage(event.error as Error);
  };
  self.onmessageerror = (event) => {
    event.preventDefault();
    sendErrorMessage(new Error('Во время принятия сообщения возникла ошибка'));
  };
  self.onunhandledrejection = (event) => {
    event.preventDefault();
    sendErrorMessage(new Error(event.reason));
  };
}

function sendMessage(message: ClientEventMessage) {
  self.postMessage(message);
}

function sendErrorMessage(error: Error) {
  sendMessage({ type: 'error', data: error });
}

function runCheckAppUpdateWork(options?: WorkerOptions) {
  let currentVersion: number | null = null;
  const interval = options?.checkAppUpdateInterval || 30 * 60 * 1000;
  const check = async (): Promise<void> => {
    const res = await fetch(__BUILD_META_PATH__, {
      cache: 'no-cache',
    });
    const data: Record<string, any> = await res.json();

    if (!data || !data.version) {
      return;
    }

    if (currentVersion === null) {
      currentVersion = data.version;

      return;
    }

    if (currentVersion !== data.version) {
      currentVersion = data.version;
      sendMessage({ type: 'app-update', data });
    }
  };

  setInterval(check, interval);
}
