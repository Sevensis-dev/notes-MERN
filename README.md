1. Создайте файлы окружения

Для сервера (в папке server создайте файл .env):
PORT=3001
MONGODB_URI=mongodb://localhost:27017/notes-app

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
<img width="1438" alt="Снимок экрана 2025-07-05 в 14 48 09" src="https://github.com/user-attachments/assets/c55f0855-1f16-467e-9d01-40a228776ac5" />
