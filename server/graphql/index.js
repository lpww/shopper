const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./types");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = {
  schema,
};
