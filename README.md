# shopper

welcome to shopper - the best shopping list app on the web! 

this repo contains 2 codebases: `client` and `server`

- `client` is a react app that can be used to edit your shopping list from a web browser
- `server` is a node server that can be used to interact with a database via graphql requests

## quick start guide

- clone the repo `git clone https://github.com/lpww/shopper.git`
- run database: `cd server && docker-compose up`
- run server: `cd server && npm ci && npm run dev`
- run client: `cd client && npm ci && npm start`
