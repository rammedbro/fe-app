# @imolater/fe-app-server

Server module using [express](https://expressjs.com/) for serving static files and routing all other requests 
to `index.html` - an SPA application built with Vite.

## Install

```bash 
npm install @imolater/fe-app-cli
```

## Configuration

This module corresponds to the [server](../types/docs/api/interfaces/FEAppConfig.md#server) key 
in the configuration file `--fe-app-config`.

## Usage

### start

Starts the server in `production` mode.

```bash
fe-app start
```

### dev

Starts the server in `development` mode.

```bash
fe-app dev [options]
```

**Options**:

* `--fe-app-config` - Path to the fe-app configuration file exporting an object of type [FEAppConfig](../types/docs/api/interfaces/FEAppConfig.md). Default is `fe-app.config.ts`.
* `--server-config` - Path to the server configuration file exporting a function of type [ServerConfig](../types/docs/api/modules/server.md#serverconfig).
* `--client-config` - Path to the client configuration file exporting a function of type [ClientConfig](../types/docs/api/modules/client.md#clientconfig).
* `--vite-config` - Path to the build configuration file exporting a call to the Vite `defineConfig` function.

**Examples**:

```bash
fe-app dev
fe-app dev --fe-app-config=fe-app.config.ts --vite-config=vite.config.ts --client-config=client.config.ts 
--server-config=server.config.ts

```

## API

[Docs](./docs/api/README.md)
