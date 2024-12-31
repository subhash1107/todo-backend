# Backend Application for Task Management

This repository contains the backend code for a task management application. The backend is built using Node.js and Express, with MongoDB as the database. It supports user authentication and task management functionalities.

---

## Features

1. **User Authentication**
   - User signup and login using JWT tokens.
   - Password hashing with bcrypt.

2. **Task Management**
   - Create, retrieve, update, and delete tasks.
   - Tasks are linked to authenticated users.

3. **CORS Support**
   - Enables cross-origin resource sharing for frontend-backend communication.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16.x or above)
- **MongoDB** (local or cloud instance)
- **npm** (v8.x or above)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/task-manager-backend.git
   cd task-manager-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/task-manager
     JWT_SECRET=your-secret-key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the production server:
   ```bash
   npm start
   ```

The server will run at `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST** `/auth/signup`
  - Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "User created successfully",
      "token": "<jwt-token>"
    }
    ```

- **POST** `/auth/signin`
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "<jwt-token>"
    }
    ```

### Tasks

- **POST** `/tasks`
  - Headers:
    ```json
    {
      "Authorization": "Bearer <jwt-token>"
    }
    ```
  - Request Body:
    ```json
    {
      "title": "New Task",
      "description": "Task description"
    }
    ```
  - Response:
    ```json
    {
      "_id": "task-id",
      "title": "New Task",
      "description": "Task description",
      "status": "pending",
      "user": "user-id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
    ```

- **GET** `/tasks`
  - Headers:
    ```json
    {
      "Authorization": "Bearer <jwt-token>"
    }
    ```
  - Response:
    ```json
    [
      {
        "_id": "task-id",
        "title": "New Task",
        "description": "Task description",
        "status": "pending",
        "user": "user-id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
    ```

---

## .gitignore

```
/node_modules
/.env
/logs
```

---

## Dependencies

- **express** - Web framework for Node.js
- **mongoose** - MongoDB object modeling tool
- **bcryptjs** - Library for hashing passwords
- **jsonwebtoken** - Library for generating and verifying JWT tokens
- **dotenv** - Loads environment variables from `.env` file
- **cors** - Enables cross-origin resource sharing

---

## Dev Dependencies

- **nodemon** - Restarts the server on file changes during development

---

