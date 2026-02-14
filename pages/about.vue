<script setup lang="ts">
defineOptions({
  name: 'AboutPage',
})

import MarqueeFill from '~/components/MarqueeFill.vue'
import FooterSection from '~/components/FooterSection.vue'
import portraitImage from '~/assets/portrait1.png'
import fullBodyImage from '~/assets/full_body.jpg'

const aboutSectionRef = ref<HTMLElement | null>(null)
const textTranslateY = ref(0)
const parallaxFactor = 0.15

function updateParallax() {
  const section = aboutSectionRef.value
  if (!section) return

  const rect = section.getBoundingClientRect()
  const viewportCenter = window.innerHeight / 2
  const sectionCenter = rect.top + rect.height / 2
  const offset = sectionCenter - viewportCenter
  textTranslateY.value = offset * parallaxFactor
}

onMounted(() => {
  window.addEventListener('scroll', updateParallax, { passive: true })
  updateParallax()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateParallax)
})
</script>

<template>
  <main>
    <div class="relative h-screen bg-(--cream) z-0">
      <!-- Sticky background across both sections -->
      <div class="sticky top-16 w-full h-screen">
        <MarqueeFill
          text="Pura Coco"
          class="absolute inset-0 top-12 w-full h-full font-[Poppins] font-extrabold"
          textClass="text-(--red) text-9xl h-24 uppercase"
        />
        <img
          :src="portraitImage"
          alt="Pura Coco"
          class="absolute w-full top-12 h-full object-cover object-top"
        />
      </div>
      <ScrollIndicator color="var(--red)" />
    </div>

    <!-- About section (text + image) -->
    <div ref="aboutSectionRef" class="relative h-screen overflow-hidden">
      <div class="h-full flex items-center justify-between">
        <div
          class="bg-(--black) text-(--cream) max-w-prose p-16 rounded-lg text-xl items-center flex flex-col gap-4 w-1/2 will-change-transform"
          :style="{ transform: `translateY(${textTranslateY}px)` }"
        >
          <p>
            Pura Coco is an electrifying Alternative R&B singer/songwriter hailing from Northwest
            Arkansas. Infusing her music with the rich influences of her Latin roots and southern
            upbringing, Pura Coco crafts a distinctive sound that is both deeply resonant and
            refreshingly unique.
          </p>
          <br />
          <p>
            With soulful vocals and raw emotional honesty, her music bridges cultures and genres,
            creating an authentic experience that speaks to the heart. Through her artistry, Pura
            Coco invites listeners into a world where tradition meets innovation, and where every
            note tells a story of identity, passion, and authenticity.
          </p>
          <br />
        </div>

        <div class="w-1/2">
          <img
            :src="fullBodyImage"
            alt="Pura Coco"
            class="w-full h-full object-contain object-top"
          />
        </div>
      </div>
    </div>

    <TourSection />

    <div class="min-h-screen flex flex-col items-end bg-(--black)">
      <FooterSection />
    </div>
  </main>
</template>
