import fs from 'node:fs';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import type { TsConfigJson } from 'type-fest';

/**
 * Проверка типов
 *
 * @param {string[]} files - Файлы подлежащие проверке. Если не передать, то будут проверены все файлы проекта,
 * указанные в поле include вашего tsconfig.json.
 * @param {string[]} opts - Опции vue-tsc
 */
export function lintTypes(files?: string[], opts?: string[]) {
  let tempConfig: string | null = null;

  try {
    let options: string[] = [
      '--noEmit',
    ];

    if (files && files.length > 0) {
      tempConfig = createTempConfig(files);
      options.push(`--project ${ tempConfig }`);
    }

    if (opts && opts.length) {
      options = options.concat(opts);
    }

    execSync(`vue-tsc ${ options.join(' ') }`);
  } catch (e) {
    throw new Error((e as any).stdout.toString());
  } finally {
    if (tempConfig) {
      deleteTempConfig(tempConfig);
    }
  }
}

function createTempConfig(files: string[]): string {
  const TSConfig: TsConfigJson = {
    extends: './tsconfig.json',
    include: files,
  };

  const hash = crypto.randomBytes(5).toString('hex');
  const filename = `temp.tsconfig.${ hash }.json`;

  fs.writeFileSync(filename, JSON.stringify(TSConfig, null, 2));

  return filename;
}

function deleteTempConfig(filename: string) {
  fs.rmSync(filename);
}
