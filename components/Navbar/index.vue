<script setup lang="ts">
import { ref } from 'vue'

const menuToggle = ref(false)

const toggleMenu = () => {
  menuToggle.value = !menuToggle.value
}
</script>

<template>
  <nav class="navbar">
    <div>
      Joker
    </div>
    <div class="relative">
      <button
        class="z-50 gap-1.5 w-10 h-10 relative flex flex-col items-center justify-center"
        @click="toggleMenu">
        <span
          class="block h-1 w-8 bg-black rounded transition-transform duration-300"
          :class="{ 'rotate-45 translate-y-3': menuToggle }" />
        <span
          class="block h-1 w-8 bg-black rounded transition-opacity duration-300"
          :class="{ 'opacity-0': menuToggle }" />
        <span
          class="block h-1 w-8 bg-black rounded transition-transform duration-300"
          :class="{ '-rotate-45 -translate-y-2': menuToggle }" />
      </button>
      <transition
          enter-active-class="transition-transform duration-300 ease-in-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-300 ease-in-out"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full" >
        <aside
            v-if="menuToggle"
            class="fixed top-0 right-0 h-full bg-white shadow-lg p-6 flex flex-col items-center justify-center space-y-4 w-full">
          <a href="#" class="text-lg font-semibold">Home</a>
          <a href="#" class="text-lg font-semibold">About</a>
          <a href="#" class="text-lg font-semibold">Services</a>
          <a href="#" class="text-lg font-semibold">Contact</a>
        </aside>
      </transition>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  @apply w-full flex flex-row justify-between py-4 px-4 md:px-0 items-center;
}
</style>
