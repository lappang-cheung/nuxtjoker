// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],
  nitro: {
    preset: "vercel",
  },
  runtimeConfig: {
    public: {
      graphqlEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/api/graphql`
          : "http://localhost:3000/api/graphql"),
    },
  },
})
