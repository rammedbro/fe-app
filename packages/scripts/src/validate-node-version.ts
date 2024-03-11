import fs from 'node:fs';

/**
 * Проверка версии NodeJS
 */
export function validateNodeVersion() {
  let nvmrc = fs.readFileSync('.nvmrc', 'utf-8').trim();

  if (nvmrc.startsWith('v')) {
    nvmrc = nvmrc.slice(1);
  }

  const nodeVersion = process.versions.node;

  if (nodeVersion !== nvmrc) {
    throw new Error(`Неправильная версия NodeJS. Используйте NodeJS ${ nvmrc } и переустановите зависимости.`);
  }
}
