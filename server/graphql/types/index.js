const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const types = loadFilesSync(path.join(__dirname), {
  extensions: ["gql"],
  ignoreIndex: true,
});

module.exports = mergeTypeDefs(types);
