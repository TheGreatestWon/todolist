# Personal Todo Management System

A full-stack todo management application built with React 19 (TypeScript) for the frontend and Node.js/Express with PostgreSQL for the backend.

## Project Structure

```
todolist/
├── backend/          # Node.js/Express backend
├── frontend/         # React 19 + TypeScript frontend
├── database/         # Database schema and migrations
├── docs/             # Documentation
├── mockup/           # Design mockups
├── swagger/          # API documentation
└── package.json      # Root package.json for managing both frontend and backend
```

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL 17
- npm >= 8.0.0

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd todolist
```

### 2. Install Dependencies

```bash
npm run install:all
```

This command installs dependencies for both the root project, frontend, and backend.

### 3. Set Up Environment Variables

#### Backend Configuration

Copy the example environment file and configure your database connection:

```bash
# In the backend directory
cd backend
cp .env.example .env
```

Edit the `.env` file and update the `DATABASE_URL` with your PostgreSQL connection details.

#### Frontend Configuration

```bash
# In the frontend directory
cd frontend
cp .env.example .env
```

### 4. Set Up Database

Follow the instructions in the `database/` directory to set up your PostgreSQL database.

### 5. Run the Application

#### Development Mode (Frontend + Backend)

```bash
npm run dev
```

This command starts both the frontend (React dev server on port 5173) and backend (Express server on port 3000) simultaneously.

#### Production Mode

First, build the frontend:

```bash
npm run build
```

Then start the backend server:

```bash
cd backend
npm start
```

## Scripts Available

In the project root directory, you can run:

- `npm run dev` - Start both frontend and backend development servers
- `npm run start` - Alternative command to start both servers
- `npm run install:all` - Install dependencies for root, frontend, and backend
- `npm run build` - Build the frontend application
- `npm run test` - Run backend tests

In the frontend directory, you can run:

- `npm start` - Start the development server on port 5173
- `npm run build` - Build the application for production
- `npm test` - Run tests

In the backend directory, you can run:

- `npm run dev` - Start the development server with ts-node
- `npm start` - Start the production server
- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests

## API Endpoints

The backend API is accessible at `http://localhost:3000/api` during development.

- Authentication: `http://localhost:3000/api/auth`
- Todos: `http://localhost:3000/api/todos`
- Swagger Docs: `http://localhost:3000/api-docs`

## Environment Variables

### Frontend (.env)

- `REACT_APP_API_URL` - Base URL for API calls (default: `http://localhost:3000/api`)

### Backend (.env)

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Port for the backend server (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## Technologies Used

- **Frontend**: React 19, TypeScript, React Router
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL 17
- **Authentication**: JWT
- **Documentation**: Swagger