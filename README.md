# Как запустить приложение
## Node version
v18.16.0

В терминале устанавливаем все зависимости командой
npm i

## Запускаем json server
Чтобы запустить сервер JSON нужно использовать команду в терминале из корневой директории там где находится файл db.json. json-server использовал версии 0.17.3
npm install -g json-server
json-server --watch db.json --port 5000

В терминале запускаем React командой
npm start
ну и затем зайти на сайт http://localhost:3000/login