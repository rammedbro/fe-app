# @imolater/fe-app-workers

Web workers for frontend applications.

## Install

Install the package

```bash
npm install @imolater/fe-app-workers
```

Include workers into bundle in config key [build](../types/docs/api/interfaces/FEAppConfig.md#build):

```ts
export default {
  build: {
    useWorkers: {
      dedicated: true,
    },
  },
};
```

## Usage

### Run

```ts
import { dedicatedWorker } from '@imolater/fe-app-workers';

dedicatedWorker.run();
```

### Events

```ts
dedicatedWorker.on('update', data => {
  console.log(data);
});

dedicatedWorker.on('error', e => {
  console.error(e);
});
```

### Stop

```ts
dedicatedWorker.terminate();
```

## API

[Docs](./docs/api/README.md)
