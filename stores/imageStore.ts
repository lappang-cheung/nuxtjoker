import { defineStore } from 'pinia'
import { gql } from 'graphql-request'
import { useNuxtApp } from '#app'

interface Image {
	url: string
	public_id: string
}

export const useImageStore = defineStore("imageStore", {
	state: () => ({
		images: [] as Image[],
		loadingImg: false,
		errorImg: null as string | null,
	}),

  actions: {
		async fetchImages() {
			this.loadingImg = true
			this.errorImg = null

      const query = gql`
        query getImages($folder: String!) {
          images(folder: $folder) {
            url
            public_id
          }
        }
			`

			try {
				const { $graphql } = useNuxtApp()

				if (!$graphql) {
					this.errorImg = "GraphQL client is not available."
				} else {
					// Explicitly type the response here
					const response = await $graphql.request<{ images: Image[] }>(query, { folder: "joker/darkKnight" })
					this.images = response.images
				}

			} catch (err) {
				this.errorImg = "Failed to load images";
				console.error(err);
			} finally {
				this.loadingImg = false;
			}
    },
  },
})
