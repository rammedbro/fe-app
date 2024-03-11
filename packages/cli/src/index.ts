import { Command } from 'commander';
import build from '@imolater/fe-app-build/cli';
import { dev, start } from '@imolater/fe-app-server/cli';
import scripts from '@imolater/fe-app-scripts/cli';
import codegen from '@imolater/fe-app-codegen/cli';

const program = new Command();

program
  .name('fe-app')
  .description('CLI для сборки и запуска фронтовых приложений')
  .addCommand(build)
  .addCommand(dev)
  .addCommand(start)
  .addCommand(scripts)
  .addCommand(codegen);

export default program;
