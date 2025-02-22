<script setup lang="ts" >
import Navbar from '@/components/Navbar/index.vue'
</script>

<template>
  <div class="baseLayout">
    <navbar />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.baseLayout {
  @apply mx-auto container w-full h-full;
}
</style>
