import fs from 'node:fs';
import path from 'node:path';
import * as husky from 'husky';
import type { PackageJson } from 'type-fest';
import * as lintstaged from '@/utils/lint-staged';

export class CodeGenerator {
  private paths = {
    packageJson: 'package.json',
    husky: '.husky',
    lintstaged: '.lintstagedrc.js',
  };

  constructor() {
    if (fs.existsSync(this.paths.husky)) {
      fs.rmSync(this.paths.husky, { recursive: true });
    }
    husky.install(this.paths.husky);
    this.addPackageScript('prepare', 'husky install');

    lintstaged.install(this.paths.lintstaged);
    this.addHuskyScript('pre-commit', 'pnpm lint-staged');
  }

  addConfigFile(name: string, data: Record<string, any>) {
    fs.writeFileSync(name, `module.exports = ${ JSON.stringify(data, null, 2) };`);
  }

  addHuskyScript(hook: string, cmd: string) {
    husky.add(path.join(this.paths.husky, hook), cmd);
  }

  addLintstagedScript(pattern: string, cmd: string) {
    lintstaged.add(this.paths.lintstaged, pattern, cmd);
  }

  addPackageScript(name: string, script: string) {
    const pkgJson: PackageJson = JSON.parse(fs.readFileSync(this.paths.packageJson, 'utf-8'));

    pkgJson.scripts = Object.assign(pkgJson.scripts || {}, { [name]: script });
    fs.writeFileSync(this.paths.packageJson, JSON.stringify(pkgJson, null, 2), 'utf-8');
  }
}
