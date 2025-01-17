/// <reference lib="webworker" />

import type { EventMessage } from '@/types';

declare const self: DedicatedWorkerGlobalScope;

self.onmessage = (evt: MessageEvent<EventMessage>) => {
  // eslint-disable-next-line no-console
  console.log(evt);
};
self.onerror = (evt) => {
  evt.preventDefault();
  sendErrorMessage(evt.error as Error);
};
self.onmessageerror = (evt) => {
  evt.preventDefault();
  sendErrorMessage(new Error('Во время принятия сообщения возникла ошибка'));
};
self.onunhandledrejection = (evt) => {
  evt.preventDefault();
  sendErrorMessage(new Error(evt.reason));
};

function sendMessage(msg: EventMessage) {
  self.postMessage(msg);
}

function sendErrorMessage(err: Error) {
  sendMessage({ type: 'error', data: err });
}
