<script setup lang="ts">
import MarqueeFill from './MarqueeFill.vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="relative h-[calc(200vh-4rem)] bg-(--cream) z-0 snap-start snap-always">
    <!-- Sticky background across both sections -->
    <div class="sticky snap-align-none top-16 w-full h-[calc(100vh-4rem)] -z-10">
      <MarqueeFill
        text="Pura Coco"
        class="absolute inset-0 w-full h-full font-[Poppins] font-extrabold"
        textClass="text-(--red) text-9xl h-24 uppercase"
      />
      <img
        src="@/assets/portrait1.png"
        alt="Pura Coco"
        class="absolute w-full h-full object-cover object-top"
      />
    </div>

    <div class="relative h-screen snap-start snap-always -mt-screen">
      <div class="h-full flex items-center justify-center">
        <div
          class="bg-(--black) text-(--cream) max-w-prose p-16 rounded-lg text-3xl items-center flex flex-col gap-4"
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
          <button
            class="m-auto bg-(--red) text-(--cream) p-4 rounded-lg flex items-center gap-2 hover:bg-(--green) transition-colors cursor-pointer"
            @click="navigateTo('/about')"
          >
            About Me <ArrowRightIcon :size="24" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
