<script setup lang="ts">
import ScrollIndicator from '@/components/ScrollIndicator.vue'
import IntroSection from '@/components/IntroSection.vue'
</script>

<template>
  <div>
    <div class="relative">
      <img src="@/assets/intro.gif" alt="Intro" class="w-screen h-screen object-cover" />
      <ScrollIndicator />
    </div>

    <IntroSection />
  </div>
</template>
