Samarpan_API

The BE API server for samarpana.

---

## Prerequisites

- Nodejs (v18.14.0)

  - Download it from [here](https://nodejs.org/en/) or
  - Install nvm in your machine
  - `nvm install 18.14.0`
  - `nvm use 18.14.0`

- Sequelize-cli

  - `npm i -g sequelize-cli`

- Postgres
  - Download it from [here](https://www.postgresql.org/download/)

## Setup and Run

- Clone the repo

  - `git clone https://github.com/Ronit77/samarpana_dev.git`
  - `cd samarpana_dev/api/`

- Install the packages

  - `npm i`

- Create .env and provide the every values for a variable

  - `cp .env.example .env`
  - Provide all DB connection params

- Create Schema

  - `npm run create-db`

- Run the server

  - `npm start`

- Start using postman to use the app.
