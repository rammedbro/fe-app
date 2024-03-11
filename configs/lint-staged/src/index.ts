export type ConfigFn = (filenames: string[]) => string | string[] | Promise<string | string[]>;
export type ConfigObject = Record<string, string | ConfigFn | (string | ConfigFn)[]>;
export type Config = ConfigFn | ConfigObject;

export const config: Config = {
  '*.{js,ts}': 'eslint --fix',
};
export const packageConfig: Config = {
  ...config,
  '*.ts': 'fe-app-scripts lint-types',
};

export default config;
