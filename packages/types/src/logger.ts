/**
 * Интерфейс опций логгера
 */
export interface LoggerOptions {
  /** Дополнительные данные, которые будут отсылаться при каждом запросе **/
  extra?: Record<string, any>;
}

/**
 * Интерфейс объекта события логгера
 */
export interface LoggerEvent {
  name?: string;
  data?: any;
  type?: string;
}

/**
 * Интерфейс объекта логгера
 */
export interface Logger {
  /**
   * Отправка события
   * @param {LoggerEvent} event - объект события
   */
  send(event: LoggerEvent): void;

  /**
   * Отправка события типа "info"
   * @param {LoggerEvent} event - объект события
   */
  info(event: LoggerEvent): void;

  /**
   * Отправка события типа "warn"
   * @param {LoggerEvent} event - объект события
   */
  warn(event: LoggerEvent): void;

  /**
   * Отправка события типа "error"
   * @param {LoggerEvent} event - объект события
   */
  error(event: LoggerEvent): void;
}
