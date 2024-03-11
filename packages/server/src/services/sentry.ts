import SentryCli from '@sentry/cli';
import { unlink } from 'fs/promises';
import { glob } from 'glob';
import { getViteConfig } from '@imolater/fe-app-build';
import type { SentryConfig, ViteMode } from '@imolater/fe-app-types';

export function getSentry(env: ViteMode, options: SentryConfig) {
  return new Sentry(env, options);
}

class Sentry {
  private readonly cli: SentryCli;
  private readonly options: SentryConfig;
  private readonly env: ViteMode;

  constructor(env: ViteMode, options: SentryConfig) {
    this.cli = new SentryCli(undefined, {
      silent: true,
      ...options,
    });
    this.env = env;
    this.options = options;
  }

  async createRelease() {
    const viteConfig = await getViteConfig(this.env);
    const { outDir, assetsDir } = viteConfig.build;

    const release = this.options.release;
    await this.cli.releases.new(release);

    const sourceMap = {
      urlPrefix: `~/${ assetsDir }`,
      include: [ `./${ outDir }/${ assetsDir }` ],
      ignore: [ 'node_modules' ],
      validate: true,
      ...this.options.sourceMaps,
    };
    await this.cli.releases.uploadSourceMaps(release, sourceMap);

    const deploy = {
      env: this.env,
      ...this.options.deploy,
    };
    await this.cli.releases.newDeploy(release, deploy);

    await this.cli.releases.finalize(release);

    const files = await glob(sourceMap.include.map(
      path => `${ path }/**/*.map`,
    ));

    for (const file of files) {
      await unlink(file);
    }

    return release;
  }
}
