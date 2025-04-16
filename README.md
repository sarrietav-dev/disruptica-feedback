# Disruptica Feedback

## Project Overview

Disruptica Feedback is a full-stack application designed to manage feedback for products and services. It includes a backend API built with Bun and Express, and a frontend SPA built with React and Vite. The backend serves the frontend's static files, enabling a seamless user experience.

### Tech Choices

- **Backend**: Bun, Express, TypeScript, DrizzleORM
- **Frontend**: React, Vite, TypeScript, React Router v7, TailwindCSS
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Installation and Running the Application

### Prerequisites

- Bun.js (if running locally)
- Docker and Docker Compose (if using containers)

### Usage

#### Using Docker Compose

1. Start the application with Docker Compose:

   ```bash
   docker-compose up --build
   ```

   If the server crashes, it's probably because the database took too long to start. Run the containers again.

2. Go to `http://localhost:8000`

3. When registering, if it is the first time it will prompt you to sign up as an admin. The **admin key** is located as an environment variable in the docker compose file.

## Notes

### Architecture

- The backend and frontend are decoupled but integrated via Docker.
- The frontend's static files are built and moved to the backend's `public` folder for serving.

### Improvements

- Add CI/CD pipelines for automated testing and deployment.
- Implement advanced logging and monitoring.
- Implement testing in both backend and frontend.
- SSR.
- The spacing in the design
