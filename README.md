# Клон Trello на Nest.js

1. Клонируйте репозиторий: git clone https://github.com/bageland0/trello-clone.git
1. Переименуйте .env.example в .env и укажите там ваши данные бд
3. Добавьте пользователей из users.sql в бд: 
    use trello_clone;
    source users.sql;

    | Пользователь | Email | Пароль |
    |-------|----------------|------------|
    | user1 | user1@mail.com | user1user1 |
    | user2 | user2@mail.com | user2user2 |
3. Установите зависимости: npm install
4. Запустите приложение: npm run start
