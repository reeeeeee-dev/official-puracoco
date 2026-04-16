<script setup lang="ts">
defineOptions({
  name: 'AboutPage',
})

import MarqueeFill from '~/components/MarqueeFill.vue'
import FooterSection from '~/components/FooterSection.vue'
import ImageGallery from '~/components/ImageGallery.vue'
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
    <div class="relative min-h-dvh bg-(--cream) z-0">
      <!-- Sticky background across both sections -->
      <div class="sticky top-16 w-full min-h-[calc(100dvh-4rem)] h-[calc(100dvh-4rem)] overflow-hidden">
        <MarqueeFill
          text="Pura Coco"
          class="absolute inset-0 top-12 w-full h-full font-[Poppins] font-extrabold"
          textClass="text-(--red) text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl h-12 sm:h-16 md:h-20 lg:h-24 uppercase"
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
    <div ref="aboutSectionRef" class="relative lg:h-screen overflow-hidden">
      <!-- Mobile: full-body image as background -->
      <img
        :src="fullBodyImage"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover object-top lg:hidden"
      />
      <div
        class="relative h-full flex flex-col lg:flex-row items-stretch lg:items-center justify-center lg:justify-between gap-8 lg:gap-0 py-10 lg:py-0 px-4 sm:px-8 lg:px-0"
      >
        <div
          class="bg-(--black)/90 lg:bg-(--black) text-(--cream) max-w-prose w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 rounded-lg text-base sm:text-lg lg:text-xl items-center flex flex-col gap-4 will-change-transform mx-auto lg:mx-0"
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
            Her heartfelt and vulnerable lyrics draw listeners into a compelling narrative, making
            her music a profound experience. Sharing stages with renowned artists like
            <em>Leon Bridges</em>, <em>Little Simz</em>, and <em>Japanese Breakfast</em>, Coco's
            dynamic performances and captivating presence mark her as a standout artist in the R&B
            scene, poised to leave a lasting impact.
          </p>
          <br />
          <p>
            With soulful vocals and raw emotional honesty, her music bridges cultures and genres,
            creating an authentic experience that speaks to the heart. Through her artistry, Pura
            Coco invites listeners into a world where tradition meets innovation, and where every
            note tells a story of identity, passion, and authenticity.
          </p>
        </div>

        <div class="hidden lg:block w-full lg:w-1/2 shrink-0">
          <img
            :src="fullBodyImage"
            alt="Pura Coco"
            class="w-full h-full object-contain object-top"
          />
        </div>
      </div>
    </div>

    <ImageGallery />
    <FooterSection />
  </main>
</template>
