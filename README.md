# @imolater/fe-app

Family of packages for scaffolding frontend applications. Monorepo powered by [Lerna](https://lerna.js.org/).

## Packages

| Name                     | Description            | Readme                                                                         |
|--------------------------|------------------------|--------------------------------------------------------------------------------|
| @imolater/fe-app-cli     | Command line interface | [![README](https://img.shields.io/badge/README--green.svg)](/packages/cli)     |
| @imolater/fe-app-build   | Builder                | [![README](https://img.shields.io/badge/README--green.svg)](/packages/build)   |
| @imolater/fe-app-server  | Server                 | [![README](https://img.shields.io/badge/README--green.svg)](/packages/server)  |
| @imolater/fe-app-config  | Config provider        | [![README](https://img.shields.io/badge/README--green.svg)](/packages/build)   |
| @imolater/fe-app-scripts | Useful scripts         | [![README](https://img.shields.io/badge/README--green.svg)](/packages/scripts) |
| @imolater/fe-app-codegen | Code generation        | [![README](https://img.shields.io/badge/README--green.svg)](/packages/codegen) |
| @imolater/fe-app-workers | Web workers            | [![README](https://img.shields.io/badge/README--green.svg)](/packages/workers) |
| @imolater/fe-app-types   | Type definitions       | [![README](https://img.shields.io/badge/README--green.svg)](/packages/types)   |

## Install

```bash
pnpm install
```

## Build

```bash
pnpm build
```

## Issues

* After each build you need to reinstall packages `pnpm install`
* Lerna incorrectly implements gitlab releases, so it's need to be auto-patched
  with [lerna@7.3.0.patch](patches/lerna@7.3.0.patch)`
