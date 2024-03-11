# Монорепозиторий

## Структура

* .gitlab - файлы для ci
* .husky - git хуки
* `configs` - конфиги
* `docs` - документация
* `packages` - пакеты

## Особенности

* Вызов команд отдельного пакета выполняется командой `npm -F ./packages/<pkg> <cmd>`

```bash
pnpm -F ./packages/server build
```
