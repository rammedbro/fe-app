import cli from '@imolater/fe-app-config/cli';
import { consola } from 'consola';

cli
  .parseAsync()
  .catch(e => {
    consola.error(e.message);
    process.exit(1);
  });
