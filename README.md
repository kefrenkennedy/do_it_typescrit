# Do_it App 📝

Do.it is an Full-Stack web application that assists users in their daily lives by managing tasks. It is a simple yet robust application. The app includes complete CRUDs for users and tasks.

## Techs ✨

- React
- Chakra
- Node.js
- TypeScript
- Prisma
- PostgreSQL
- JSON web token
- bcrypt
- react-toastify
- Express
- Express-validator
- UUID
- Vite
- Axios
- React-icons
- Yup
- react-hook-form
- and react-router-dom.

## Base URL ✨

- http://localhost:3333/

## Diagram:

![Diagram](DIAGRAM.png)

## Features ✨

- Create an account with name, email, and password
- Log in using email and password
- Update account information such as email, name, and password
- Delete the account along with all the created tasks
- Create tasks with title and description
- Mark tasks as completed
- Delete tasks
- Search for tasks in the search box

## Getting Started 🚀

To run the app, first, you need to configure the .env file with your PostgreSQL database settings. Then, follow the steps below:

### Backend

1. Fill the .env with your database information
2. Open the backend folder in your terminal
3. Run `npm install` or `yarn install`
4. Run `prisma migrate dev --name init` to execute the migrations to the database
5. Run `npm dev` or `yarn dev`
6. The server will be running on http://localhost:3333

### Frontend

1. Open the frontend folder in your terminal
2. Run npm install or yarn install
3. Run `npm dev` or `yarn dev`
4. The frontend will be running on http://localhost:5173

## Routes 🛣️

- `POST /`: Login
- `POST /signup`: User registration
- `GET /dashboard`: List all tasks
- `DELETE /dashboard/user/:userId`: Delete user
- `GET /dashboard/user`: Show all users
- `PATCH /dashboard/user/:userId`: Update user information
- `POST /dashboard/task`: Create task
- `GET /dashboard/task/search`: Search for tasks
- `PATCH /dashboard/task/:taskId`: Update task information
- `DELETE /dashboard/task/:taskId`: Delete task
- `PATCH /dashboard/task/complete/:taskId`: Mark task as completed

Almost all routes require authentication. The JWT accessToken is generated when the user is created or logs in and can be accessed in the response.
Checkout the postman's collection on the backend folder to see the tests! (Do_It.postman_collection.json)
Thank you for checking out my Do_it app! 🙌

Project made by me, Kefren Vasconcelos
