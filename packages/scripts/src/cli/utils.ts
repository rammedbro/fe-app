import { Command } from 'commander';

/**
 * Тип callback функции для commander
 */
type ActionFn = Parameters<Command['action']>[0];

/**
 * Парсинг аргументов и опций для commander c опцией allowUnknownOption
 *
 * @param {ActionFn} action - callback функция для commander
 * @param {Options} options
 * @returns {ActionFn}
 */
export function parseArgsAndOptsForAction(action: ActionFn, options?: Options): ActionFn {
  return (tokens: string[]) => {
    const optsStartIndex = tokens.findIndex((item) => item.startsWith('--'));
    const args = tokens.slice(0, optsStartIndex);
    const opts = parseOpts(tokens.slice(optsStartIndex), options);

    return action(args, opts);
  };
}

/**
 * Парсинг опций для commander c опцией allowUnknownOption
 *
 * @param {ActionFn} action
 * @param {Options} options
 * @returns {ActionFn}
 */
export function parseOptsForAction(action: ActionFn, options?: Options): ActionFn {
  return (tokens: string[]) => {
    const opts = parseOpts(tokens, options);

    return action(opts);
  };
}

/**
 * Опции парсинга опций из командной строки
 */
interface Options {
  /**
   * Формат вывода
   */
  format?: 'array' | 'object';
}

function parseOpts(tokens: string[], options: Options = {}) {
  const { format = 'array' } = options;
  let opts: string[] | Record<string, string> = tokens
    .map((item, index) => {
      if (!item.startsWith('--')) {
        return undefined;
      }

      const nextItem = tokens[index + 1] as string | undefined;

      return nextItem?.startsWith('--') ? item : [ item, nextItem ].join(' ');
    })
    .filter(item => typeof item === 'string') as string[];

  if (format === 'object') {
    opts = Object.fromEntries(opts.map(item => {
      const [ key, value ] = item.split(' ');

      return value !== undefined ? [ key, value ] : [ key, 'true' ];
    }));
  }

  return opts;
}
