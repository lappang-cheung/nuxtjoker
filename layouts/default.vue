<script setup lang="ts" >
import Navbar from '@/components/Navbar/index.vue'
</script>

<template>
  <div class="baseLayout">
    <div class="baseLayout-content">
      <navbar />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.baseLayout {
  @apply bg-black w-full h-full;
  &-content {
    @apply mx-auto container w-full h-full;
  }
}
</style>
