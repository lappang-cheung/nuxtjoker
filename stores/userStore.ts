import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
	state: () => ({
		users: [],
		loading: false,
		error: null
	}),
	actions: {
		async fetchUsers() {
			this.loading = true
			try {
				const response = await fetch('/api/graphql', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						query: `{
              users {
                id
                name
                email
              }
            }`
					})
				})

				if (!response.ok) throw new Error(`HTTP Error ${response.status}`)

				const result = await response.json()

				if (!result?.data?.users) throw new Error('Invalid GraphQL response')

				this.users = result.data.users
			} catch (err:any) {
				this.error = err?.message
			} finally {
				this.loading = false
			}
		}
	}
})
