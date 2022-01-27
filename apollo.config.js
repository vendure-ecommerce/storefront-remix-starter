module.exports = {
  client: {
    excludes: ["**/generated/graphql.ts"],
    includes: ['./app/**/*'],
    // service: "spot-api@staging"
    service: {
      // Make sure you _don't_ have APOLLO_KEY in your
      // env vars if you're running the Apollo extension
      // for VSCode against a local schema file due to a bug
      // in the extension:
      // https://github.com/apollographql/apollo-tooling/issues/1129
      name: "vendure-remix",
      localSchemaFile: __dirname + "/app/generated/schema.graphql",
    },
  },
};
