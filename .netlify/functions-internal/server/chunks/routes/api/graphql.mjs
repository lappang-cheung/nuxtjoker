import { createYoga, createSchema } from 'graphql-yoga';
import { d as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';

const getUsers = () => {
  return [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" }
  ];
};

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }
`;
const resolvers = {
  Query: {
    users: () => getUsers()
  }
};
const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/api/graphql",
  // GraphQL API endpoint
  fetchAPI: { Response }
  // ✅ Required for Nuxt 3 Nitro compatibility
});
const graphql = defineEventHandler((event) => yoga.handle(event.node.req, event.node.res));

export { graphql as default };
//# sourceMappingURL=graphql.mjs.map
