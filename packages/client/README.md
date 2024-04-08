# @imolater/fe-app-client

Client logic for frontend applications.

## Install

```bash 
npm install @imolater/fe-app-client
```

## Usage

### Logger

```ts 
import { getLogger } from '@imolater/fe-app-client';

// Create a logger
const logger = getLogger(window.___config, {
  extra: {
    additionalKey: 'some-data-that-i-used-to-know',
  },
});

// Log something like errors
try {
  someFunctionThatMightThrowException();
} catch (e) {
  logger.error({
    name: 'critical-error',
    data: e,
  });
}
```

## API

[Docs](./docs/api/README.md)
