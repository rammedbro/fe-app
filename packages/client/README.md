# @imolater/fe-app-client

Общий клиентский код для frontend приложений.

## Установка

```bash 
npm install @imolater/fe-app-client
```

## Использование

### Логгер

```ts 
import { getLogger } from '@imolater/fe-app-client';

// Получение инстанса
const logger = getLogger(window.___config, {
  extra: {
    additionalKey: 'some-data-that-i-used-to-know',
  },
});

// Отправка события
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

[Документация](./docs/api/README.md)
