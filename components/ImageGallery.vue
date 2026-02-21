<script setup lang="ts">
defineOptions({
  name: 'ImageGallery',
})

const images = [
  {
    src: 'https://picsum.photos/seed/pura1/500/375',
    alt: 'Gallery image 1',
    width: 500,
    height: 375,
  },
  {
    src: 'https://picsum.photos/seed/pura2/600/450',
    alt: 'Gallery image 2',
    width: 600,
    height: 450,
  },
  {
    src: 'https://picsum.photos/seed/pura3/450/350',
    alt: 'Gallery image 3',
    width: 450,
    height: 350,
  },
  {
    src: 'https://picsum.photos/seed/pura4/550/400',
    alt: 'Gallery image 4',
    width: 550,
    height: 400,
  },
  {
    src: 'https://picsum.photos/seed/pura5/480/360',
    alt: 'Gallery image 5',
    width: 480,
    height: 360,
  },
  {
    src: 'https://picsum.photos/seed/pura6/650/500',
    alt: 'Gallery image 6',
    width: 650,
    height: 500,
  },
  {
    src: 'https://picsum.photos/seed/pura7/520/390',
    alt: 'Gallery image 7',
    width: 520,
    height: 390,
  },
  {
    src: 'https://picsum.photos/seed/pura8/580/420',
    alt: 'Gallery image 8',
    width: 580,
    height: 420,
  },
  {
    src: 'https://picsum.photos/seed/pura9/470/350',
    alt: 'Gallery image 9',
    width: 470,
    height: 350,
  },
  {
    src: 'https://picsum.photos/seed/pura10/600/400',
    alt: 'Gallery image 10',
    width: 600,
    height: 400,
  },
  {
    src: 'https://picsum.photos/seed/pura11/540/405',
    alt: 'Gallery image 11',
    width: 540,
    height: 405,
  },
  {
    src: 'https://picsum.photos/seed/pura12/620/465',
    alt: 'Gallery image 12',
    width: 620,
    height: 465,
  },
]

const row1 = images.slice(0, 6)
const row2 = images.slice(6, 12)
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
</style>
