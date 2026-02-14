<script setup lang="ts">
defineOptions({
  name: 'AboutPage',
})

import MarqueeFill from '~/components/MarqueeFill.vue'
import AboutSection from '~/components/AboutSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import { useSnapScroll } from '~/composables/useSnapScroll'
import portraitImage from '~/assets/portrait1.png'

useSnapScroll()
</script>

<template>
  <main>
    <div class="relative h-screen bg-(--cream) z-0 snap-start snap-always">
      <!-- Sticky background across both sections -->
      <div class="sticky snap-align-none top-16 w-full h-screen">
        <MarqueeFill
          text="Pura Coco"
          class="absolute inset-0 w-full h-full font-[Poppins] font-extrabold"
          textClass="text-(--red) text-9xl h-24 uppercase"
        />
        <img
          :src="portraitImage"
          alt="Pura Coco"
          class="absolute w-full h-full object-cover object-top"
        />
      </div>
    </div>
    <AboutSection />
    <div class="snap-start snap-always min-h-screen flex items-end bg-(--black)">
      <FooterSection />
    </div>
  </main>
</template>
