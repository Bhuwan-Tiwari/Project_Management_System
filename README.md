# Project Management System

This is a backend API for a Project Management System built with **Node.js**, **Prisma**, **Express**, and **PostgreSQL**. It allows users to manage projects, tasks, and users with secure JWT-based authentication.

## Features

- **User Management**: Allows creation, listing, updating, and deletion of users.
- **Project Management**: Create, update, delete, and list projects.
- **Task Management**: Create, update, delete, and list tasks. Tasks can be filtered by status and assigned user.
- **Authentication**: JWT-based authentication for secure access to project and task data.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **Prisma ORM**: ORM for managing PostgreSQL database.
- **PostgreSQL**: Relational database for storing project and task data.
- **JWT**: Token-based authentication for secure user login and access control.
- **bcryptjs**: For hashing passwords securely.

## Prerequisites

Ensure that the following tools are installed:

- **Node.js** (v16.0.0 or higher)
- **PostgreSQL** (or a PostgreSQL database connection)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/project-management-system.git
   cd project-management-system
Install dependencies:

bash
Copy code
npm install
Set up your environment variables:

Create a .env file at the root of the project and add the following variables:

env
Copy code
DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database-name
JWT_SECRET=your-jwt-secret-key
Set up the database schema with Prisma:

bash
Copy code
npx prisma migrate dev --name init
Start the application:

bash
Copy code
npm start
The server will be running at http://localhost:3000.

API Endpoints
Authentication
POST /login: Login with credentials and receive a JWT token.

Request body:

json
Copy code
{
  "email": "user@example.com",
  "password": "your-password"
}
Response:

json
Copy code
{
  "token": "jwt-token-here"
}
User Endpoints
POST /users: Create a new user.
GET /users: List all users.
GET /user/:id: Get details of a specific user.
PUT /user/:id: Update a user's details.
DELETE /user/:id: Delete a user.
Project Endpoints
POST /projects: Create a new project.
GET /projects: List all projects.
GET /project/:id: Get details of a specific project.
PUT /project/:id: Update a project's details.
DELETE /project/:id: Delete a project.
Task Endpoints
POST /project/:projectId/tasks: Create a new task under a specific project.
GET /project/:projectId/tasks: List tasks for a project.
GET /tasks: List all tasks, filter by status or user.
GET /task/:id: Get details of a specific task.
PUT /task/:id: Update a task's details.
DELETE /task/:id: Delete a task.
Database Schema
This project uses Prisma ORM with a PostgreSQL database. Below is the Prisma schema for the application:

prisma
Copy code
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  projects  Project[]
  tasks     Task[]
}

enum ProjectStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
}

model Project {
  id          String        @id @default(uuid())
  name        String
  description String
  status      ProjectStatus @default(PLANNED)
  createdAt   DateTime      @default(now())
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  tasks       Task[]
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

model Task {
  id             String     @id @default(uuid())
  title          String
  description    String
  status         TaskStatus @default(TODO)
  createdAt      DateTime   @default(now())
  projectId      String
  project        Project    @relation(fields: [projectId], references: [id])
  assignedUserId String?
  assignedUser   User?      @relation(fields: [assignedUserId], references: [id])
}
Authentication Middleware
For authentication, a valid JWT token is required for accessing project and task data. When making requests to protected endpoints, include the token in the Authorization header as follows:

bash
Copy code
Authorization: Bearer <jwt-token>
Running Tests
If you want to run tests for the application, ensure the test framework is set up and use:

bash
Copy code
npm test
Contributing
Fork the repository.
Create a new branch: git checkout -b feature-branch.
Commit your changes: git commit -am 'Add new feature'.
Push to the branch: git push origin feature-branch.
Create a pull request.
License
This project is licensed under the MIT License.

bash
Copy code

#### Additional Files

1. **.env** file:

   ```env
   DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database-name
   JWT_SECRET=your-jwt-secret-key
.gitignore file:

gitignore
Copy code
node_modules/
.env
