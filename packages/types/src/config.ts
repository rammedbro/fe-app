/** Окружение, в котором работает приложение */
export type Environment = 'production' | 'development';

/**
 * Интерфейс объекта хоста сформированного деплоером
 */
export interface HostConfig {
  name: string;
  env: Environment;
  port: number;
}

/**
 * Интерфейс объекта конфигурации приложения
 */
export interface Config {
  /** Объект хоста **/
  host: HostConfig;
}
