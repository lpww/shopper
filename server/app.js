"use strict";

const autoLoad = require("fastify-autoload");
const mercurius = require("mercurius");
const path = require("path");
const postgres = require("fastify-postgres");

const graphql = require("./graphql");

module.exports = async function (fastify, opts) {
  // register fastify-postgres, the postgres plugin
  fastify.register(postgres, {
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}`,
  });

  // register mercurius, the graphql plugin
  fastify.register(mercurius, {
    graphiql: true,
    ...graphql,
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(autoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(autoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
