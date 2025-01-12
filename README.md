# Project Management API

This is a Project Management API built with Node.js, Express, Prisma, and PostgreSQL. The API allows users to manage projects, tasks, and assign tasks to users. It includes JWT authentication for protected routes.

## Features

- **Project Management**: 
  - Create, Update, Delete, and List Projects.
  - Projects are associated with users and have statuses (Planned, Ongoing, Completed).
  
- **Task Management**: 
  - Add tasks to projects.
  - Assign tasks to users.
  - Update task status (e.g., TODO, IN_PROGRESS, DONE).
  
- **Authentication**: 
  - Basic JWT authentication to secure routes.
  - Only authorized users (based on JWT) can update or delete projects and tasks.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database for storing user, project, and task data.
- **JWT (JSON Web Tokens)**: For authentication and authorization.

## Endpoints

### Authentication

- **POST /auth/login**: Login and get a JWT token.
  
### Project Management

- **POST /projects**: Create a new project.
- **GET /projects**: Get all projects.
- **GET /projects/:id**: Get a specific project by ID.
- **PUT /projects/:id**: Update a project (requires JWT token).
- **DELETE /projects/:id**: Delete a project (requires JWT token).

### Task Management

- **POST /projects/:projectId/tasks**: Create a task under a project.
- **GET /projects/:projectId/tasks**: List all tasks for a project.
- **PUT /tasks/:id**: Update task details or status (requires JWT token).
- **DELETE /tasks/:id**: Delete a task (requires JWT token).

## Setup

### Prerequisites

- Node.js
- PostgreSQL
- Prisma CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/project-management-api.git
   cd project-management-api
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root of the project and add the following:

env
Copy code
DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/yourdatabase?schema=public
JWT_SECRET=your_jwt_secret
Migrate the database:

bash
Copy code
npx prisma migrate dev --name init
Seed the database (optional):

If you want to populate your database with initial data, you can create a seed script or use Prisma Studio to insert data.

Start the server:

bash
Copy code
npm start
The server will start at http://localhost:3000.

Testing API Endpoints with Postman
You can test the API endpoints using Postman. Ensure to include the JWT token in the Authorization header for any routes that require authentication.

Example Postman Setup:
Authorization: Select Bearer Token and paste the JWT token.
Body: Use raw JSON format for POST/PUT requests.
Example Requests:
POST /auth/login:

Request Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "yourpassword"
}
POST /projects:

Request Body:
json
Copy code
{
  "name": "New Project",
  "description": "Project description",
  "status": "PLANNED"
}
Folder Structure
bash
Copy code



Acknowledgements
Prisma ORM for database management.
Express.js for routing and API management.
PostgreSQL for database storage.
JWT for authentication.
