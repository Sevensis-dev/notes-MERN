1. Создайте файлы окружения

Для сервера (в папке server создайте файл .env):
PORT=3001
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=ваш_секретный_ключ

Для клиента (в папке client создайте файл .env):
REACT_APP_API_URL=http://localhost:3001

2. Установите зависимости

Сначала для сервера:
cd server
npm install express dotenv mongoose cors

Затем для клиента:
cd ../client
npm install axios react react-dom

3. Запустите MongoDB
Убедитесь что MongoDB запущен локально или измените MONGODB_URI в .env файле сервера на вашу строку подключения

4. Запустите приложение

В одном терминале (сервер):
cd server
npm start

В другом терминале (клиент):
cd ../client
npm start
