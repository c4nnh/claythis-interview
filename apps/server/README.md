# Server

A server built with NestJS

## Technologies Used

- NestJS
- PostgreSQL
- Prisma
- Zod

## Prerequisites

- Node.js (v18 or higher)
- pnpm

## Setup

### 1. Clone the repository

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

### 4. Database setup

#### prisma setup

```bash
pnpm prisma db push
```

#### generate prisma client

```bash
pnpm prisma generate
```

### 5. Run the server

You can run the server in dev mode or production mode

#### dev mode

```bash
pnpm start:dev
```

#### production mode

```bash
pnpm build
```

```bash
pnpm start
```

### 6. Swagger UI

Basic knowledge of Swagger UI is required to use this API.
After running the server, you can access the Swagger UI at `http://localhost:[port]/swagger`.
replace `[port]` with the port number you are running the server on in the `.env` file.

For example, if you are running the server on port 3000, you can access the Swagger UI at [`http://localhost:3000/swagger`](http://localhost:3000/swagger)
