## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

#### Setting Environment

- Clone the repository

```bash
git clone https://github.com/DSB2004/hlsr_assignment.git

cd /hlsr_assignment
```

#### Start Postgres with Docker

```bash
docker run --name assignment_db \
  -e POSTGRES_PASSWORD=12345678 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=my_database \
  -p 5432:5432 \
  -d postgres

```

#### Start Redis with Docker

```bash
docker run --name redis_db \
  -p 6379:6379 \
  -d redis

```

#### Setting Up Env

- Create a .env file in the root of the project.

- Use the .env.example file provided in the repository as a reference.

```bash
# .env
DATABASE_URL=postgres://postgres:12345678@localhost:5432/my_database
REDIS_URL=redis://localhost:6379/0
JWT_SECRET="<YOUR JWT TOKEN>"
APP_EMAIL="<YOUR EMAIL>"
APP_PASSWORD="<YOUR EMAIL PASSWORD>"
NODE_ENV="development"


```

### Starting Development Server

#### To install dependencies

```bash
# npm
npm install

# bun
bun i
```

#### To generate Prisma client

```bash
# npm
npm prisma generate

# bun
bun prisma generate
```

#### To migrate Database

```bash
# npm
npm prisma migrate reset

# bun
bun prisma migrate reset
```

#### To start the development server

```bash
# npm
npm run dev

# bun
bun run dev
```

- To start cron worker

```bash
# npm
npm run ./src/worker/index.ts

#bun
bun run ./src/worker/index.ts

```
