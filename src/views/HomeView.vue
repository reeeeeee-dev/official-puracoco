<script setup lang="ts">
import ScrollIndicator from '@/components/ScrollIndicator.vue'
import IntroSection from '@/components/IntroSection.vue'
import { useSnapScroll } from '@/composables/useSnapScroll'

useSnapScroll()
</script>

<template>
  <div>
    <div class="relative snap-start snap-always">
      <video
        autoplay
        muted
        src="https://website-host.reetikpatel.me/intro.mp4"
        alt="Intro"
        class="w-screen h-screen object-cover"
      />
      <ScrollIndicator />
    </div>

    <!-- <div class="h-16 snap-start snap-always" /> -->
    <IntroSection />
  </div>
</template>
