import { defineNuxtPlugin } from '#app'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const apolloClient = new ApolloClient({
	uri: "/api/graphql",
	cache: new InMemoryCache(),
});

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
