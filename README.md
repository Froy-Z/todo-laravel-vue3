# Тестовое задание

Это тестовое задание, в котором используется стек технологий:

- **PHP8.3** (для бекенда)
- **Laravel 11.44.2** (framework)
- **Node 22.14.0** (среда выполнения JS)
- **Npm 10.9.2** (менеджер пакетов для Node)
- **MySQL** (для работы с базой данных)
- **VueJS 3.5.13** (для фронтенда)
- **Vuetify 3.8.0** (дополнение к фреймворку)
- **TailwindCSS 4.1.3** (настройка стилей)

База данных разворачивается в **Docker** контейнере:

## Техническое задание

ТЗ включало в себя следующие функциональные требования:

1. **Регистрация и авторизация пользователей**
    - Пользователи могут зарегистрироваться и авторизоваться в системе.

2. **Управление задачами ToDo**
    - Пользователь может создавать, редактировать и удалять задачи из своего ToDo листа.
    - Пользователь может просматривать список всех своих задач.

3. **Очередность задач**
    - Задачи в листе каждого пользователя должны располагаться по очереди: 1, 2, 3 и т.д.
    - Пользователь может менять задачи местами в очереди.
    - Новые задачи всегда добавляются в конец списка.

4. **Уникальность порядка задач**
    - У одного пользователя не может быть несколько задач на одном и том же месте очереди (например, несколько задач на
      первом месте).
    - Значение сочетания **user_id** и **порядок задачи** является уникальным.

## Добавление репозитория локально

1. Соберите контейнеры с помощью команды:
   ```bash
   git

## Установка и запуск

Для развертывания проекта выполните следующие шаги:

1. Собираем контейнер с помощью команды:
   ```bash
   docker-compose build -d

2. Поднимаем БД в Docker
   ```bash
   docker-compose up -d

3. Устанавливаем зависимости для работы
   ```bash
   composer install
4. Скопируйте файл .env.example в .env 
   ```bash
   copy .env.example .env
5. Скопируйте файл .env.example в .env
   ```bash
   php artisan key:generate
6. Запускаем миграции
   ```bash
   php artisan migrate
7. Поднимаем сервер
   ```bash
   php artisan serve --host=localhost --port=8080
8. Поднимаем фронт
   ```bash
   npm run dev

Функционал будет доступен по адресу:
[Тестовый сайт](http://localhost:8080)
