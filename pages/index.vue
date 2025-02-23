<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

// Initialize store
const imageStore = useImageStore()
// Make state reactive
const { images, loadingImg, errorImg } = storeToRefs(imageStore)

onMounted(async () => {
  await imageStore.fetchImages()
})
</script>

<template>
  <div>
    <p v-if="loadingImg">Loading image...</p>
    <p v-if="errorImg">Error fetching image: {{ errorImg }}</p>

    <div v-if="images.length" class="grid grid-cols-2 gap-4">
      <div v-for="image in images" :key="image.public_id">
        <img :src="image.url" :alt="image.public_id" class="w-full rounded-lg shadow-md" />
      </div>
    </div>
  </div>
</template>
