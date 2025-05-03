# Healthcare Worker Management System

This repository contains a simplified project for managing healthcare worker shifts and ratings. For detailed information about the PR review exercise, please see [docs/challenge.md](docs/challenge.md).

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

And finally, run the server with:

```sh
> $ npm start
```
