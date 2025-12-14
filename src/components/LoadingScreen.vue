<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import logoSvg from '@/assets/head_logo.svg?raw'
import LoadingDots from './LoadingDots.vue'

const isVisible = ref(true)

// Disable scrolling when loading screen is visible
watch(
  isVisible,
  (visible) => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

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

onUnmounted(() => {
  // Ensure scrolling is re-enabled if component is unmounted
  document.body.style.overflow = ''
})
</script>

<template>
  <Transition name="fade-out">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-(--black)">
      <div class="flex flex-col items-center gap-6">
        <div
          class="size-96 animate-pulse [&_svg]:w-full [&_svg]:h-full [&_svg]:block text-(--cream)"
          v-html="logoSvg"
        />
        <LoadingDots />
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
