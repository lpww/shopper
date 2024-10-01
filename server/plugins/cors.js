"use strict";

const fp = require("fastify-plugin");
const cors = require("@fastify/cors");

/**
 * This plugins adds cors configuration
 *
 * @see https://github.com/fastify/fastify-cors
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(cors);
});
