<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ScrollIndicator from '@/components/ScrollIndicator.vue'
import IntroSection from '@/components/IntroSection.vue'

onMounted(() => {
  document.documentElement.classList.add('snap-scroll')
})

onUnmounted(() => {
  document.documentElement.classList.remove('snap-scroll')
})
</script>

<template>
  <div>
    <div class="relative snap-start snap-stop">
      <video
        autoplay
        muted
        src="https://website-host.reetikpatel.me/intro.mp4"
        alt="Intro"
        class="w-screen h-screen object-cover"
      />
      <ScrollIndicator />
    </div>

    <div class="h-16 snap-start snap-stop" />
    <IntroSection />
  </div>
</template>
