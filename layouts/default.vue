<script setup lang="ts" >
import Navbar from '@/components/Navbar/index.vue'
import Loader from '@/components/Loader/index.vue'

defineProps({
  hasDoneLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <loader v-if="hasDoneLoading" />
  <div
    v-else
    class="baseLayout">
    <navbar />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.baseLayout {
  @apply mx-auto container w-full h-full;
}
</style>
