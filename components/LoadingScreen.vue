<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import logoSvg from '~/assets/head_logo.svg?raw'
import LoadingDots from './LoadingDots.vue'

const isVisible = ref(true)
let dismissTimeout: ReturnType<typeof setTimeout> | null = null

// Disable scrolling when loading screen is visible
watch(
  isVisible,
  (visible) => {
    if (process.client) {
      if (visible) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  { immediate: true },
)

function dismiss() {
  if (!isVisible.value) return
  isVisible.value = false
}

onMounted(() => {
  if (!process.client) return

  // Dismiss once the DOM is interactive — don't wait for all resources (images, video, iframes).
  // A hard cap of 2 s ensures we never hang on slow connections.
  dismissTimeout = setTimeout(dismiss, 2000)

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    if (dismissTimeout) clearTimeout(dismissTimeout)
    dismissTimeout = null
    dismiss()
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        if (dismissTimeout) clearTimeout(dismissTimeout)
        dismissTimeout = null
        dismiss()
      },
      { once: true },
    )
  }
})

onUnmounted(() => {
  if (dismissTimeout) {
    clearTimeout(dismissTimeout)
    dismissTimeout = null
  }
  // Ensure scrolling is re-enabled if component is unmounted
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Transition name="fade-out">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-(--black)">
      <div class="flex flex-col items-center gap-6">
        <div
          class="size-44 min-[400px]:size-56 sm:size-72 md:size-96 animate-pulse [&_svg]:w-full [&_svg]:h-full [&_svg]:block text-(--cream)"
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

@media (prefers-reduced-motion: reduce) {
  .fade-out-enter-active,
  .fade-out-leave-active {
    transition: none;
  }
}
</style>
