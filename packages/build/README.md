# @imolater/fe-app-build

A build module using [vite](https://vitejs.dev/).

## Installation

```bash
npm install @imolater/fe-app-cli
```

## Configuration

This module corresponds to the `build` key in the `--fe-app-config` configuration file.

## Usage

### build

Start the build in `production` mode.

```bash
fe-app build [options]
```

**Options**:

* `--fe-app-config`: path to the fe-app configuration file exporting an object of the `FEAppConfig` type. By default, it is `fe-app.config.ts`.
* `--vite-config`: path to the build configuration file exporting a call to the vite `defineConfig` function.

**Examples**:

```bash
fe-app build
fe-app build --fe-app-config=fe-app.config.ts --vite-config=vite.config.ts
```

## API

[Documentation](./docs/api/README.md)
