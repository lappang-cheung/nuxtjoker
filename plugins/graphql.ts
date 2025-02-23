import { GraphQLClient } from "graphql-request";

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	// Ensure URL is correctly set
	if (!config.public.graphqlEndpoint) {
		console.error("GraphQL endpoint is not defined in runtimeConfig!");
		return;
	}

	const client = new GraphQLClient(config.public.graphqlEndpoint as string);

	return {
		provide: {
			graphql: client, // Attach GraphQL client to Nuxt
		},
	};
});
