<script setup lang="ts">
import { ref, onMounted } from 'vue'
import logoSvg from '@/assets/head_logo.svg?raw'

const isVisible = ref(true)

onMounted(() => {
  // Wait for page to fully load (including images and fonts)
  if (document.readyState === 'complete') {
    // If already loaded, wait a minimum time for smooth UX
    setTimeout(() => {
      isVisible.value = false
    }, 500)
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        isVisible.value = false
      }, 500)
    })
  }
})
</script>

<template>
  <Transition name="fade-out">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-(--black)">
      <div class="flex flex-col items-center gap-6">
        <div
          class="size-96 animate-pulse [&_svg]:w-full [&_svg]:h-full [&_svg]:block text-(--cream)"
          v-html="logoSvg"
        ></div>
        <div class="flex gap-2">
          <div
            class="size-2 rounded-full bg-(--cream) animate-bounce"
            style="animation-delay: 0s"
          ></div>
          <div
            class="size-2 rounded-full bg-(--cream) animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
          <div
            class="size-2 rounded-full bg-(--cream) animate-bounce"
            style="animation-delay: 0.4s"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-enter-from,
.fade-out-leave-to {
  opacity: 0;
}
</style>
