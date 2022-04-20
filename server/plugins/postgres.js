"use strict";

const fp = require("fastify-plugin");
const postgres = require("fastify-postgres");

/**
 * This plugins adds a /graphql endpoint
 *
 * @see https://github.com/mercurius-js/mercurius
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(postgres, {
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}`,
  });
});
