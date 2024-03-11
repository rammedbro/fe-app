import { loadModule, resolveFeAppConfigs } from '@imolater/fe-app-build';
import type { Command } from 'commander';
import type { FEAppConfig } from '@imolater/fe-app-types';

/**
 * Обрабатывает объект опций путей до конфиг файлов на pre-action хуке commander
 *
 * @param {Command} thisCommand - инстанс текущей команды commander
 * @param {Command} actionCommand - инстанс итоговой action команды commander
 */
export function handleConfigsPreActionHook(thisCommand: Command, actionCommand: Command) {
  const feAppConfigOption = actionCommand.getOptionValue('feAppConfig');
  if (!feAppConfigOption) return;

  const feAppConfig = loadModule<FEAppConfig>(feAppConfigOption, { compile: true });
  if (!feAppConfig.configs) return;

  Object
    .entries(resolveFeAppConfigs(feAppConfig.configs, actionCommand.opts()))
    .forEach(([key, value]) => actionCommand.setOptionValue(key, value));
}
