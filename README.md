# MERN stack Todo List

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application where users can register, login using JWT authentication, and manage their todos. Users can categorize their todos and filter them. The application also supports light and dark mode.

## Setup

### Backend

1. Clone or download the project.
2. Navigate to the backend folder.
3. Run `npm i` to install backend dependencies.
4. Create a `.env` file in the root of the backend folder.
5. Add the following lines to the `.env` file:
   DB_URI=mongodb://localhost:27017/todo-app-mern-stack
   JWT_SECRET=4fccfb075de0815f1a032bd77c0a160c59c471284ece54e09d438712dc7f1a9f
   JWT_EXPIRES=3d

6. Start the backend server by running `npm run dev:start`.

### Frontend

1. Navigate to the frontend folder.
2. Run `npm i` or `npm install` to install frontend dependencies.
3. Run `npm run dev` to start the frontend server.

Now, both the backend and frontend servers are running, and you can interact with my application.

## Technologies Used

### Backend

- NestJS v10.0.0
- MongoDB v8.3.4
- Selenium-webdriver v4.20.0

### Frontend

- Next.js v14.2.3
- React v18
- TypeScript v5
- Redux Toolkit v2.2.4
- React-Redux v9.1.2
- Redux-Persist v6.0.0
- Axios v1.6.8
- Next-Themes v0.3.0
- React-Toastify v10.0.5
- Tailwind CSS v3.4.1
- Tailwind Scrollbar v3.1.0

## Features

- User authentication with JWT
- Task Dashboard after login
- CRUD operations for todos with authorization
- Todo categorization and filtering
- Responsive Design support
- Fetch user data from LinkedIn using Selenium WebDriver
- pagination to imporve initial load
- Light and dark mode support
