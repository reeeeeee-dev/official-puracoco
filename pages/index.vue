<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

import ScrollIndicator from '~/components/ScrollIndicator.vue'
import TourSection from '~/components/TourSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import { useSnapScroll } from '~/composables/useSnapScroll'
import { ArrowRightIcon } from 'lucide-vue-next'
import screamImage from '~/assets/scream.jpg'

useSnapScroll()

// When navigating from another page, keep content hidden until we've scrolled to top to avoid flash to tour section
const navigatedToIndex = useState<boolean>('navigatedToIndex', () => false)
const revealContent = ref(!navigatedToIndex.value)
onMounted(() => {
  if (navigatedToIndex.value) {
    navigatedToIndex.value = false
    const t = setTimeout(() => {
      revealContent.value = true
    }, 700)
    onUnmounted(() => clearTimeout(t))
  }
})

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
  <div
    class="transition-opacity duration-300"
    :class="[revealContent ? 'opacity-100' : 'opacity-0 pointer-events-none']"
  >
    <div class="relative snap-start snap-always overflow-hidden">
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

    <!-- About section -->
    <!-- TODO: For some reason, removing the flex from the div here breaks the section. Also propagation of the z-index is not working as expected. -->
    <div class="snap-start snap-always h-screen bg-(--black) flex">
      <img :src="screamImage" alt="About Me Image" class="w-2/3 h-full object-cover z-10" />
      <div
        class="flex flex-col items-center justify-start h-screen w-screen z-20 bg-(--black) overflow-hidden gap-16 text-(--cream)"
      >
        <video
          autoplay
          loop
          muted
          src="https://website-host.reetikpatel.me/intro.mp4"
          alt="Intro"
          class="object-contain"
        />
        <div class="text-4xl font-bold">Hi! I'm Pura Coco</div>
        <NuxtLink
          to="/about"
          class="text-(--cream) text-2xl p-4 rounded-md bg-(--red) hover:bg-(--green) transition-colors duration-300 flex items-center gap-2"
        >
          Learn more about me <ArrowRightIcon />
        </NuxtLink>
      </div>
    </div>

    <TourSection />
    <div class="snap-start snap-always min-h-screen flex items-end bg-(--black)">
      <FooterSection />
    </div>
  </div>
</template>
