/* eslint-disable no-console */
/// <reference lib="webworker" />

import type { EventMessage } from '@/types';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', console.log);
self.addEventListener('activate', console.log);
self.addEventListener('message', console.log);
self.addEventListener('error', console.error);
self.onmessageerror = (evt) => {
  evt.preventDefault();
  sendErrorMessage(new Error('Во время принятия сообщения возникла ошибка'));
};
self.onunhandledrejection = (evt) => {
  evt.preventDefault();
  sendErrorMessage(new Error(evt.reason));
};

function sendMessage(msg: EventMessage) {
  self.serviceWorker.postMessage(msg);
}

function sendErrorMessage(err: Error) {
  sendMessage({ type: 'error', data: err });
}
