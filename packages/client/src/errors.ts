/**
 * Интерфейс данных ошибки запроса
 */
export interface RequestErrorData {
  message: string;
  code: string;
  data: object;
}

/**
 * Класс ошибок запроса
 */
export class RequestError extends Error {
  public name: string;
  public stack?: string;
  public code: string;
  public data: object;

  constructor({ message, code, data = {} }: RequestErrorData) {
    super(message);

    this.name = this.constructor.name;
    this.stack = new Error(message).stack;
    this.code = code || 'unknown';
    this.data = data;
  }
}
