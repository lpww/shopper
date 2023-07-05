# shopper

welcome to shopper - a shopping list app! 

this repo contains 2 codebases: `client` and `server`

- `client` is a react app that can be used to edit your shopping list from a web browser
- `server` is a node server that can be used to interact with a database via graphql requests

## quick start guide

- clone the repo: `git clone https://github.com/lpww/shopper.git`
- copy example env: `cd server && cp .env.example .env`
- edit `server/.env` to assign `POSTGRES_DB`, `POSTGRES_PASSWORD`, and `POSTGRES_USER` any value you like
- run database: `cd server && docker-compose up`
- run server: `cd server && npm ci && npm run dev`
- run client: `cd client && npm ci && npm start`
