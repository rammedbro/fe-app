import process from 'node:process';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { buildSync } from 'esbuild';
import requireFromString from 'require-from-string';

interface Options {
  /** Рабочая директория. По-умолчанию - process.cwd() */
  cwd?: string;
  /**
   * Пре-компиляция с помощью esbuild {@link https://esbuild.github.io/api/#build},
   * По-умолчанию - false
   */
  compile?: boolean;
}

/**
 * Загрузка модулей с возможностью пре-компиляции esm и ts модулей
 *
 * @param {string} path - Путь загружаемого модуля
 * @param {Options} options - Опции
 * @returns {T} - Возвращает модуль типа Т
 */
export function loadModule<T>(path: string, options: Options = {}): T {
  const {
    cwd = process.cwd(),
    compile = false,
  } = options;

  if (compile) {
    const result = buildSync({
      entryPoints: [path],
      bundle: true,
      write: false,
      format: 'cjs',
    });

    const module = requireFromString(result.outputFiles[0].text);

    return module.default as T;
  }

  const require = createRequire(import.meta.url);
  const module = require(resolve(cwd, path));

  return module as T;
}
