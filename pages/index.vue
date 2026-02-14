<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

import ScrollIndicator from '~/components/ScrollIndicator.vue'
import TourSection from '~/components/TourSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import { useSnapScroll } from '~/composables/useSnapScroll'

useSnapScroll()

const scrollY = ref(0)
const parallaxFactor = 0.35

const heroImageStyle = computed(() => ({
  transform: `translateY(${-scrollY.value * parallaxFactor}px)`,
}))

function updateScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll, { passive: true })
  updateScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <div>
    <div class="relative snap-start snap-always overflow-hidden">
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
        class="size-screen object-cover absolute -top-100 right-0 will-change-transform"
        :style="heroImageStyle"
      />
      <div class="flex items-center justify-center bg-white w-screen h-screen">
        <h1 class="text-[15vw] rotate-45 text-(--cream) font-bold font-[Gwendolyn] z-10">
          Pura Coco
        </h1>
      </div>
      <ScrollIndicator />
    </div>

    <TourSection />
    <div class="snap-start snap-always min-h-screen flex items-end bg-(--black)">
      <FooterSection />
    </div>
  </div>
</template>
