<script setup lang="ts">
defineOptions({
  name: 'MusicPage',
})

useHead({
  title: 'Music | Pura Coco',
})

const streamingServices = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/artist/03a3TmpMFgHPURsTZZ0iac',
    color: '#1DB954',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/us/artist/pura-coco/1488284425',
    color: '#FA243C',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/playlist?list=OLAK5uy_kl0Z9TKLJRWM_8XasFSyW2mZEK0bCkIuI',
    color: '#FF0000',
  },
  {
    name: 'YouTube Music',
    url: 'https://music.youtube.com/channel/UCB71BObmCSIGRAf81MpvRug',
    color: '#FF0000',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/artists/B081NV3T33/pura-coco',
    color: '#00A8E1',
  },
]

const getCardShape = (index: number) => {
  const shapes = [
    {
      shapeClass: 'shape-star',
      rotation: 'rotate-12',
    },
    {
      shapeClass: 'shape-hexagon',
      rotation: '-rotate-6',
    },
    {
      shapeClass: 'shape-pentagon',
      rotation: '-rotate-12',
    },
    {
      shapeClass: 'shape-diamond',
      rotation: 'rotate-45',
    },
    {
      shapeClass: 'shape-octagon',
      rotation: '-rotate-12',
    },
  ]
  return shapes[index] || shapes[0]
}

let fadeOutTimeout: ReturnType<typeof setTimeout> | null = null

const updateGradient = (color: string) => {
  const main = document.querySelector('main')
  if (!main) return

  // Clear any pending fade out
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout)
    fadeOutTimeout = null
  }

  if (color === 'transparent') {
    // Let the CSS opacity transition handle the fade out
    // Then set color to transparent after fade completes
    fadeOutTimeout = setTimeout(() => {
      main.style.setProperty('--gradient-color', 'transparent')
    }, 800)
  } else {
    // Convert hex to rgba with opacity
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    main.style.setProperty('--gradient-color', `rgba(${r}, ${g}, ${b}, 0.3)`)
  }
}
</script>

<template>
  <main
    class="h-screen p-4 md:p-8 text-(--cream) relative overflow-x-hidden overflow-y-hidden flex flex-col"
    :style="{ '--gradient-color': 'transparent' }"
  >
    <div
      class="page-gradient absolute inset-0 pointer-events-none transition-opacity duration-500"
    ></div>
    <h1 class="text-3xl md:text-4xl mb-2 md:mb-4 font-bold shrink-0 relative z-10">Music</h1>
    <div class="flex-1 flex items-center justify-center min-h-0 relative z-10">
      <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <div
          v-for="(service, index) in streamingServices"
          :key="service.name"
          class="music-card-wrapper group relative p-0.5 bg-(--cream) transition-colors duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] w-44 h-44 md:w-56 md:h-56"
          :class="[getCardShape(index).shapeClass, getCardShape(index).rotation]"
          :style="{ '--service-color': service.color }"
          @mouseenter="updateGradient(service.color)"
          @mouseleave="updateGradient('transparent')"
        >
          <a
            :href="service.url"
            target="_blank"
            rel="noopener noreferrer"
            class="music-card relative bg-(--black) overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center no-underline text-(--cream) w-full h-full"
          >
            <div
              class="relative z-10 text-center p-3 md:p-4 w-full h-full flex flex-col items-center justify-center gap-2 md:gap-3"
            >
              <h2
                class="text-sm md:text-base font-bold m-0 transition-colors duration-300"
                :class="`music-card-title-${index}`"
              >
                {{ service.name }}
              </h2>
              <div
                class="opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 md:w-6 md:h-6"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page-gradient {
  background: linear-gradient(
    to right,
    var(--gradient-color) 0%,
    var(--gradient-color) 20%,
    transparent 40%,
    transparent 60%,
    var(--gradient-color) 80%,
    var(--gradient-color) 100%
  );
  opacity: 0;
  transition:
    opacity 0.8s ease-out,
    background 0.8s ease-out;
}

main:has(.music-card-wrapper:hover) .page-gradient {
  opacity: 1;
  transition:
    opacity 0.5s ease-in,
    background 0.5s ease-in;
}

.music-card-wrapper:hover {
  background: var(--service-color);
}

.music-card {
  clip-path: inherit;
}

.music-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--service-color);
  opacity: 0;
  transition: opacity 0.3s ease;
  clip-path: inherit;
}

.music-card-wrapper:hover .music-card::before {
  opacity: 0.1;
}

.music-card-wrapper:hover .music-card-title-0,
.music-card-wrapper:hover .music-card-title-1,
.music-card-wrapper:hover .music-card-title-2,
.music-card-wrapper:hover .music-card-title-3,
.music-card-wrapper:hover .music-card-title-4 {
  color: var(--service-color);
}

/* Star shape (5-pointed star) */
.shape-star {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}

.music-card-wrapper.shape-star {
  padding: 6px;
}

/* Hexagon shape */
.shape-hexagon {
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
}

/* Pentagon shape */
.shape-pentagon {
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* Diamond shape */
.shape-diamond {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* Octagon shape */
.shape-octagon {
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
</style>
