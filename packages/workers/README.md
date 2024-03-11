# @imolater/fe-app-workers

Пакет с различными веб-воркерами.

## Установка

Устанавливаем пакет:

```bash
npm install @imolater/fe-app-workers
```

Включаем воркеры в сборку в `fe-app.config.ts` в ключе [build](../types/docs/api/interfaces/FEAppConfig.md#build):

```ts
export default {
  build: {
    useWorkers: {
      dedicated: true,
    },
  },
};
```

## Использование

### Создание

```ts
import { dedicatedWorker } from '@imolater/fe-app-workers';

dedicatedWorker.run({
  checkAppUpdateInterval: 60 * 60 * 1000
});
```

### Подписка на события

```ts
dedicatedWorker.on('app-update', data => {
  console.log(data);
});

dedicatedWorker.on('error', e => {
  console.error(e);
});
```

### Уничтожение

```ts
dedicatedWorker.terminate();
```

## API

[Документация](./docs/api/README.md)
