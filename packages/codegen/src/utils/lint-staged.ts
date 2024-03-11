import fs from 'fs';
import module from 'module';
import path from 'path';
import process from 'process';
import type { ConfigObject } from 'lint-staged';

function install(filename: string) {
  fs.writeFileSync(filename, `module.exports = ${ JSON.stringify({}, null, 2) };`, 'utf-8');
}

function add(filename: string, pattern: string, cmd: string) {
  const require = module.createRequire(process.cwd());
  const config: ConfigObject = require(path.join(process.cwd(), filename));

  config[pattern] = cmd;
  fs.writeFileSync(filename, `module.exports = ${ JSON.stringify(config, null, 2) };`, 'utf-8');
}

export { install, add };
