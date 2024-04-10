# @imolater/fe-app-scripts

Useful scripts for frontend applications.

## Install

```bash 
npm install @imolater/fe-app-cli
```

## Usage

### lint-types

Project type checking using [vue-tsc](https://www.npmjs.com/package/vue-tsc)

```bash
fe-app scripts lint-types [files...] [options...]
```

**Arguments**:

* `files` - files to be checked, specified with spaces. If left empty, 
            all project files specified in `tsconfig.json` will be checked.
* `options` - vue-tsc options

**Examples**:

```bash
fe-app scripts lint-types
fe-app scripts lint-types src/index.ts src/example.ts
fe-app scripts lint-types --noEmit --skipLibCheck
fe-app scripts lint-types src/index.ts --noEmit
```

### validate-node-version

Checking the Node version compliance with the one specified in .nvmrc

```bash
fe-app scripts validate-node-version
```

It is recommended to add this script to the `pre-commit` hook. Example:

```bash
fe-app scripts validate-node-version
```

## API

[Docs](./docs/api/README.md)
