"use strict";

const fp = require("fastify-plugin");
const mercurius = require("mercurius");

const graphql = require("../graphql");

/**
 * This plugins adds a /graphql endpoint
 *
 * @see https://github.com/mercurius-js/mercurius
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(mercurius, {
    graphiql: true,
    ...graphql,
  });
});
