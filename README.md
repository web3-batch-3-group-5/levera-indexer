# Levera Indexer

Here are steps to run services on docker containers.

### Step 1. Run PostgreSQL and PgAdmin

Set-up environment files for your Postgres database. Copy `.env.example` file twice and respectively rename those files to `.env` and `.env.local`. `.env` is used for setting up postgres and `.env.local` is used for running ponder locally.

In the project repository parallel to `docker-compose.yml`, type the following command to install the dependencies and run your database:

```bash
docker-compose up -d
```

Your PostgreSQL is ready! 🚀

### Step 2. Run Ponder (GraphQL)

In the project repository parallel to `Dockerfile`, type the following command to build docker image:

```bash
docker build --no-cache -t ponder-subgraph:latest .
```

After the image has been created, type the following command to build docker container:

```bash
docker run -d -p 42069:42069 --name ponder ponder-subgraph:latest
```

Your Graph is ready! 🚀
