import codegenModules from '@/modules';
import { CodegenFnOptions } from '@/types';
import { CodeGenerator } from '@/generator';

/**
 * Генерация файлов для frontend проекта с нуля
 *
 * @param {string[]} modules - используемые модули
 * @param {CodegenFnOptions} options - Опции
 * @param {string} options.cwd - Рабочая директория
 */
export function initProject(modules: string[], options?: CodegenFnOptions) {
  const generator = new CodeGenerator();

  Object.entries(codegenModules)
    .filter(([ name ]) => modules.includes(name))
    .forEach(([ , fn ]) => fn(generator, options));
}
