<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

import ScrollIndicator from '~/components/ScrollIndicator.vue'
import TourSection from '~/components/TourSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import screamImage from '~/assets/scream.jpg'

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

const aboutParallaxFactor = 0.25
const aboutImageStyle = computed(() => ({
  transform: `translateY(${scrollY.value * aboutParallaxFactor - window.innerHeight / 4}px)`,
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
    <div class="relative overflow-hidden">
      <img
        src="~/assets/hero.jpg"
        alt="Pura Coco"
        class="w-screen object-contain absolute will-change-transform"
        :style="heroImageStyle"
      />
      <div class="flex items-start justify-center bg-[#e8ecd7] w-screen h-screen">
        <h1 class="text-[15vw] text-(--red) font-bold font-[Gwendolyn] z-10">Pura Coco</h1>
      </div>
      <ScrollIndicator color="var(--red)" />
    </div>

    <!-- About section -->
    <div class="h-screen bg-(--black) flex overflow-hidden">
      <div class="w-1/2 h-full overflow-hidden shrink-0">
        <img
          :src="screamImage"
          alt="About Me Image"
          class="size-full object-contain z-10 will-change-transform"
          :style="aboutImageStyle"
        />
      </div>
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
    <div class="min-h-screen flex items-end bg-(--black)">
      <FooterSection />
    </div>
  </div>
</template>
