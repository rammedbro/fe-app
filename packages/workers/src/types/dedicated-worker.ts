export type ClientEventMessage =
  { type: 'app-update'; data: Record<string, unknown> } |
  { type: 'error'; data: Error };

export type WorkerEventMessage =
  { type: 'install'; data?: WorkerOptions; };

/**
 * Опции настройки воркера
 */
export interface WorkerOptions {
  /** Интервал времени между запросами на проверку обновления приложения  */
  checkAppUpdateInterval?: number;
}
