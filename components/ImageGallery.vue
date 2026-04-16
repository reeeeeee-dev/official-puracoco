<script setup lang="ts">
defineOptions({
  name: 'ImageGallery',
})

const images = [
  {
    src: '/gallery/01.webp',
    alt: 'Singer performing on stage under green and pink stage lights.',
    width: 1024,
    height: 682,
  },
  {
    src: '/gallery/02.webp',
    alt: 'Studio portrait seated on a vintage chair in a patchwork vest and dress.',
    width: 682,
    height: 1024,
  },
  {
    src: '/gallery/03.webp',
    alt: 'Outdoor portrait leaning on a curved orange structure against a clear blue sky.',
    width: 684,
    height: 1024,
  },
  {
    src: '/gallery/04.webp',
    alt: 'Live performance singing into a microphone under purple stage lighting.',
    width: 1024,
    height: 682,
  },
  {
    src: '/gallery/05.webp',
    alt: 'Full-length live performance on stage with drums and spotlights.',
    width: 682,
    height: 1024,
  },
  {
    src: '/gallery/06.webp',
    alt: 'Collaborative meeting at a glass whiteboard in a bright modern office.',
    width: 1024,
    height: 682,
  },
  {
    src: '/gallery/07.webp',
    alt: 'Atmospheric live performance on a dark stage with warm amber lighting.',
    width: 682,
    height: 1024,
  },
  {
    src: '/gallery/08.webp',
    alt: 'Portrait on a red couch in an industrial-style room with exposed brick. Photo: Audrey Smith.',
    width: 1024,
    height: 588,
  },
  {
    src: '/gallery/09.webp',
    alt: 'Artistic portrait with curly hair and bold red lipstick against a teal background.',
    width: 683,
    height: 1024,
  },
  {
    src: '/gallery/10.webp',
    alt: 'Group of performers on an outdoor stage under purple concert lighting.',
    width: 819,
    height: 1024,
  },
  {
    src: '/gallery/11.webp',
    alt: 'Moody portrait in a denim jacket with dramatic blue and orange lighting.',
    width: 819,
    height: 1024,
  },
  {
    src: '/gallery/12.webp',
    alt: 'Stylized overhead portrait in a school-inspired outfit on a light background.',
    width: 1024,
    height: 1024,
  },
  {
    src: '/gallery/13.webp',
    alt: 'Crouched portrait in a star-patterned sweater with a hand extended toward the camera.',
    width: 682,
    height: 1024,
  },
  {
    src: '/gallery/14.webp',
    alt: 'Close-up portrait in a pink jacket and yellow sunglasses against a bright yellow backdrop.',
    width: 682,
    height: 1024,
  },
]

const mid = Math.ceil(images.length / 2)
const row1 = images.slice(0, mid)
const row2 = images.slice(mid)
</script>

<template>
  <section class="bg-(--black) py-16 md:py-24 overflow-hidden">
    <h2
      class="text-2xl md:text-3xl font-bold text-(--cream) mb-10 md:mb-14 text-center font-[Poppins] px-4"
    >
      Gallery
    </h2>
    <div class="flex flex-col gap-6 md:gap-8">
      <div class="gallery-scroll-mask">
        <div class="gallery-scroll-track gallery-scroll-left">
          <div
            v-for="(image, index) in [...row1, ...row1]"
            :key="`row1-${index}`"
            class="gallery-image-wrapper shrink-0"
            :style="{ aspectRatio: `${image.width} / ${image.height}` }"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              class="h-full w-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div class="gallery-scroll-mask">
        <div class="gallery-scroll-track gallery-scroll-right">
          <div
            v-for="(image, index) in [...row2, ...row2]"
            :key="`row2-${index}`"
            class="gallery-image-wrapper shrink-0"
            :style="{ aspectRatio: `${image.width} / ${image.height}` }"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              class="h-full w-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-scroll-mask {
  overflow: hidden;
}

.gallery-scroll-track {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  width: max-content;
  height: 240px;
}

@media (min-width: 768px) {
  .gallery-scroll-track {
    height: 320px;
    gap: 2rem;
  }
}

.gallery-scroll-left {
  animation: gallery-scroll-left 240s linear infinite;
}

.gallery-scroll-right {
  animation: gallery-scroll-right 240s linear infinite;
}

.gallery-image-wrapper {
  height: 100%;
}

.gallery-image-wrapper img {
  height: 100%;
  width: auto;
  max-width: none;
}

@keyframes gallery-scroll-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes gallery-scroll-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-scroll-left,
  .gallery-scroll-right {
    animation: none;
  }
}
</style>
