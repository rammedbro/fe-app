import cli from '@imolater/fe-app-server/cli';
import { consola } from 'consola';

cli
  .parseAsync()
  .catch(e => {
    consola.error(e.message);
    process.exit(1);
  });
