<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

// Initialize store
const userStore = useUserStore()
const imageStore = useImageStore()
// Make state reactive
const { images, loadingImg, errorImg } = storeToRefs(imageStore)
const { users, loading, error } = storeToRefs(userStore)

onMounted(async () => {
// Fetch users when the page loads
  await userStore.fetchUsers()
  await imageStore.fetchImages()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">User List</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="loadingImg">Loading image...</p>
    <p v-if="errorImg">Error fetching image: {{ errorImg }}</p>

    <ul v-if="users.length" class="mt-4 space-y-2">
      <li v-for="user in users" :key="user.id" class="p-2 border rounded-lg">
        <strong>{{ user.name }}</strong> - {{ user.email }}
      </li>
    </ul>

    <div v-if="images.length" class="grid grid-cols-2 gap-4">
      <div v-for="image in images" :key="image.public_id">
        <img :src="image.url" :alt="image.public_id" class="w-full rounded-lg shadow-md" />
      </div>
    </div>
  </div>
</template>
