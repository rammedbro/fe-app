import SentryCli from '@sentry/cli';
import { unlink } from 'fs/promises';
import { glob } from 'glob';
import type { SentryConfig } from '@imolater/fe-app-types';

interface Options {
  env?: string;
  outDir?: string;
  assetsDir?: string;
}

export async function createSentryRelease(
  config: SentryConfig,
  options: Options = {}
) {
  const cli = new SentryCli(undefined, {
    silent: true,
    ...config,
  });

  const release = config.release;
  await cli.releases.new(release);

  const assetsDir = options?.assetsDir || 'assets';
  const sourceMap = config.sourceMaps || {
    urlPrefix: `~/${ assetsDir }`,
    include: [`./${ options?.outDir || 'build' }/${ assetsDir }`],
    ignore: ['node_modules'],
    validate: true,
  };
  await cli.releases.uploadSourceMaps(release, sourceMap);

  const deploy = config.deploy || {
    env: options.env || 'production',
  };
  await cli.releases.newDeploy(release, deploy);

  await cli.releases.finalize(release);

  const files = await glob(sourceMap.include.map(
    path => `${ path }/**/*.map`,
  ));

  for (const file of files) {
    await unlink(file);
  }

  return release;
}
