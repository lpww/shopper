# shopper server

The shopper server is graphql api running node that is built with fastify and mercurius. It is accompanied by a postgres
database running in a docker container.

## local setup

Ensure that you are in the server directory before continuing through the setup docs. `cd server/`

### node version

This server runs node `v18.20.4`, which can be installed with `nvm use 18.20.4`.

### environment variables

1. `cp .env.example .env` to initialize your environment
2. Open `.env` and edit the postgres password (POSTGRES_PASSWORD). For local development, it can be set to any value

### database

1. Start the database: `docker-compose up`
2. Stop the database: `docker-compose down`

### server

1. Install dependencies: `npm ci`
2. Run the server: `npm run dev`

- NOTE: `npm start` can be used to run the app in production mode

## tests

1. Run the tests: `npm test`

## graphiql playground

The server has graphiql enabled. Visit http://localhost:3000/graphiql to visit an in-browser tool for writing,
validating, and testing graphql queries. The server graphql documentation is also visible from this page.

## graphql api

### add an item

```graphql
mutation {
  addItem(item: { name: "test item", description: "test description", quantity: 1, completed: false }) {
    item {
      id
      name
      description
      quantity
      completed
    }
  }
}
```

### update an item

```graphql
mutation {
  updateItem(item: { id: 1, completed: true, name: "thomas update", description: "updated description", quantity: 2 }) {
    item {
      id
      name
      description
      quantity
      completed
    }
  }
}
```

### delete an item

```graphql
mutation {
  deleteItem(item: { id: 1 }) {
    item {
      id
      name
      completed
    }
  }
}
```

### get items

```graphql
query {
  getItems {
    id
    name
    description
    quantity
    completed
  }
}
```
