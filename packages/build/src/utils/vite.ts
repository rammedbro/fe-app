import type { Logger } from 'vite';

export function suppressViteLoggerWarn(logger: Logger, condition: (msg: string) => boolean) {
  const { warn } = logger;

  logger.warn = (msg, options) => {
    if (condition(msg)) return;

    warn(msg, options);
  };

  return logger;
}
