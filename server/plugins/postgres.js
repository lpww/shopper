"use strict";

const fp = require("fastify-plugin");
const postgres = require("@fastify/postgres");

/**
 * This plugins adds some utilities to handle postgres connections
 *
 * @see https://github.com/fastify/fastify-postgres
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(postgres, {
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}`,
  });
});
