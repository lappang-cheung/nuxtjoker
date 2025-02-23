import { defineStore } from 'pinia'
import { gql } from 'graphql-request'
import { useNuxtApp } from '#app'

export const useImageStore = defineStore("imageStore", {
	state: () => ({
		images: [] as { url: string; public_id: string }[],
		loadingImg: false,
		errorImg: null as string | null,
	}),

    actions: {
			async fetchImages() {
				this.loading = true
				this.error = null

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

					if (!$graphql) throw new Error("GraphQL client is not available.")
					const { images } = await $graphql.request(query, { folder: "joker/darkKnight" })
					this.images = images;
				} catch (err) {
					this.errorImg = "Failed to load images";
					console.error(err);
				} finally {
					this.loadingImg = false;
				}
      },
    },
});
