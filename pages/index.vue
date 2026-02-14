<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

import ScrollIndicator from '~/components/ScrollIndicator.vue'
import AboutSection from '~/components/AboutSection.vue'
import TourSection from '~/components/TourSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import { useSnapScroll } from '~/composables/useSnapScroll'

useSnapScroll()
</script>

<template>
  <div>
    <div class="relative snap-start snap-always">
      <!-- <video
        autoplay
        muted
        src="https://website-host.reetikpatel.me/intro.mp4"
        alt="Intro"
        class="w-screen h-screen object-cover"
      /> -->
      <img
        src="~/assets/red_face.jpg"
        alt="Pura Coco"
        class="size-screen object-cover absolute -top-100 right-0"
      />
      <div class="flex items-center justify-evenly bg-white w-screen h-screen">
        <h1 class="text-3xl text-(--cream) z-10">Hello</h1>
      </div>
      <ScrollIndicator />
    </div>

    <AboutSection />
    <TourSection />
    <div class="snap-start snap-always min-h-screen flex items-end bg-(--black)">
      <FooterSection />
    </div>
  </div>
</template>
