"use strict";

const path = require("path");
const autoLoad = require("fastify-autoload");
const mercurius = require("mercurius");

const graphql = require("./graphql");

module.exports = async function (fastify, opts) {
  fastify.register(mercurius, {
    graphiql: "playground",
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
