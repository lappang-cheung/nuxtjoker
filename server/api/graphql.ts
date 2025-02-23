import { createSchema, createYoga } from 'graphql-yoga'
import { defineEventHandler } from 'h3'

// Define GraphQL schema
const typeDefs = `  
  type Image {
    url: String!
    public_id: String!
  }

  type Query {
    images(folder: String!): [Image!]!
  }
`

// Define resolvers
const resolvers = {
	Query: {
		images: async (_: any, { folder }: { folder: string }) => {
			try {
				const result = await cloudinary.api.resources({
					type: "upload",
					prefix: folder, // Fetch images from the specified folder
					max_results: 10, // Adjust as needed
				});

				return result.resources.map((image: any) => ({
					url: image.secure_url,
					public_id: image.public_id,
				}));
			} catch (error) {
				console.error("Error fetching images:", error);
				return [];
			}
		},
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
