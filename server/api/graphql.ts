import { createSchema, createYoga } from 'graphql-yoga'
import { defineEventHandler } from 'h3'
import { getUsers } from '@/server/services/userService'

// Define GraphQL schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }
`

// Define resolvers
const resolvers = {
	Query: {
		users: () => getUsers()
	}
}

// Create Yoga GraphQL server
const yoga = createYoga({
	schema: createSchema({ typeDefs, resolvers }),
	graphqlEndpoint: '/api/graphql', // GraphQL API endpoint
	fetchAPI: { Response } // ✅ Required for Nuxt 3 Nitro compatibility
})

// Export as Nitro event handler
export default defineEventHandler((event) => yoga.handle(event.node.req, event.node.res))
