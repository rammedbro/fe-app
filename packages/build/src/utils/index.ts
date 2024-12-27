import { basename, extname } from 'node:path';
import type { Configs } from '@imolater/fe-app-types';
import { deepmerge } from './merge';

export { loadModule } from './module';
export { deepmerge } from './merge';
export { suppressViteLoggerWarn } from './vite';

/**
 * Преобразование значений объекта с приведением к новому тип
 *
 * @param {Record<K, V>} object
 * @param {(value: V) => R} callback
 * @returns {Record<K, R>}
 */
export function mapObjectValues<K extends string, V, R>(
  object: Record<K, V>,
  callback: (value: V) => R,
): Record<K, R> {
  const entries = Object.entries<V>(object).map(([key, value]) => [key, callback(value)]);

  return Object.fromEntries(entries);
}

/**
 * Получение имени файла из пути
 *
 * @param {string} filename - Путь до файла
 * @param {boolean | string} ext - Включить в имя расширение файла. Если передать расширение в виде строки,
 * то оно будет подставлено вместо оригинального. По-умолчанию - true.
 * @returns {string}
 */
export function fileBasename(filename: string, ext: boolean | string = true): string {
  return basename(filename, extname(filename)) + (
    ext
      ? typeof ext === 'string' ? ext : extname(filename)
      : ''
  );
}

/**
 * Разрешение путей до конфиг файлов fe-app
 *
 * Получение итоговых путей до конфиг файлов fe-app на основе опций cli и fe-app.config.
 * Приоритет отдается опциям cli.
 *
 * @param {Configs} fromConfig - Объект путей из fe-app.config
 * @param {Configs} fromCli - Объект путей из cli
 * @returns {Configs}
 */
export function resolveFeAppConfigs(fromConfig: Configs, fromCli: Configs): Configs {
  return deepmerge({}, fromConfig, fromCli);
}
