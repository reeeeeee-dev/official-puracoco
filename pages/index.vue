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

const aboutSectionRef = ref<HTMLElement | null>(null)
const aboutInView = ref(false)
let aboutObserver: IntersectionObserver | null = null

onMounted(() => {
  if (aboutSectionRef.value) {
    aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) aboutInView.value = true
        })
      },
      { threshold: 0.8, rootMargin: '0px 0px -150px 0px' },
    )
    aboutObserver.observe(aboutSectionRef.value)
  }
})

onUnmounted(() => {
  aboutObserver?.disconnect()
})

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
    <div ref="aboutSectionRef" class="h-screen bg-(--black) flex overflow-hidden">
      <div
        class="w-1/2 h-full overflow-hidden shrink-0 transition-all duration-700 ease-out"
        :class="aboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'"
      >
        <img
          :src="screamImage"
          alt="About Me Image"
          class="size-full object-contain z-10 will-change-transform"
          :style="aboutImageStyle"
        />
      </div>
      <div
        class="flex flex-col items-center justify-center h-screen w-screen z-20 bg-(--black) overflow-hidden gap-16 text-(--cream)"
      >
        <video
          autoplay
          loop
          muted
          src="https://website-host.reetikpatel.me/intro.mp4"
          alt="Intro"
          class="object-contain transition-all duration-700 ease-out"
          :class="aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        />
        <div
          class="text-4xl font-bold transition-all duration-700 ease-out"
          :class="aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: aboutInView ? '200ms' : '0ms' }"
        >
          Hi! I'm Pura Coco
        </div>
        <div
          class="text-lg max-w-prose transition-all duration-700 ease-out"
          :class="aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: aboutInView ? '450ms' : '0ms' }"
        >
          <p>Pura Coco is a singer-songwriter making music that’s honest and full of soul.</p>
        </div>
        <NuxtLink
          to="/about"
          class="text-(--cream) text-2xl p-4 rounded-md bg-(--red) hover:bg-(--green) transition-all duration-700 ease-out flex items-center gap-2"
          :class="aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: aboutInView ? '700ms' : '0ms' }"
        >
          Learn more about me <ArrowRightIcon />
        </NuxtLink>
      </div>
    </div>

    <TourSection />
    <FooterSection />
  </div>
</template>
