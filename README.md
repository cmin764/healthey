# Healthcare Worker Management System

This repository contains a simplified project for managing healthcare worker shifts and ratings.

## Local Setup

Pre-requisites:

- Node.js version 16+ (https://nodejs.org/en/download/)
- Docker (https://docs.docker.com/get-docker/)
- docker-compose (https://docs.docker.com/compose/install/)

Clone the repository, `cd` into it, then run:

```sh
> $ npm i
```

The repository comes with a docker-compose.yml file to easily run PostgreSQL, to spin this up:

```sh
> $ docker-compose up -d
```

You should be able to connect to Postgres using any client at localhost:5432 (the default Postgres port). The credentials can be found in the `docker-compose.yml` file and in the `.env.sample` file. Make a copy of `.env.sample` and name it `.env`:

```sh
> $ cp .env.sample .env
```

Apply DB migrations with:

```sh
> $ npx prisma migrate dev
```

## Development Workflow

The project provides several npm scripts for different development scenarios:

- **Development Mode** (with auto-reload):
  ```sh
  > $ npm run dev
  ```
  This uses nodemon to automatically restart the server when files change.

- **Run Once** (without auto-reload):
  ```sh
  > $ npm run run
  ```
  Runs the server once using ts-node.

- **Build for Production**:
  ```sh
  > $ npm run build
  ```
  This will:
  1. Generate Prisma client
  2. Sync resources
  3. Compile TypeScript to JavaScript

- **Start Production Build**:
  ```sh
  > $ npm start
  ```
  Runs the compiled JavaScript code from the `dist` directory.

Choose the appropriate command based on your development needs:
- Use `npm run dev` during active development for the best developer experience
- Use `npm run run` for one-off runs or testing
- Use `npm run build` followed by `npm start` for production-like environments

## Reviewing code

For detailed information about the merged PR as a review exercise, please see the [challenge](docs/challenge.md).
