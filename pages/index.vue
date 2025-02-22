<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

// Initialize store
const userStore = useUserStore()
// Make state reactive
const { users, loading, error } = storeToRefs(userStore)

onMounted(async () => {
// Fetch users when the page loads
  await userStore.fetchUsers()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">User List</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <ul v-if="users.length" class="mt-4 space-y-2">
      <li v-for="user in users" :key="user.id" class="p-2 border rounded-lg">
        <strong>{{ user.name }}</strong> - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
