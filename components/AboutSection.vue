<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="relative h-screen snap-start snap-always">
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
          creating an authentic experience that speaks to the heart. Through her artistry, Pura Coco
          invites listeners into a world where tradition meets innovation, and where every note
          tells a story of identity, passion, and authenticity.
        </p>
        <br />
        <NuxtLink
          to="/about"
          class="m-auto bg-(--red) text-(--cream) p-4 rounded-lg flex items-center gap-2 hover:bg-(--green) transition-colors cursor-pointer"
        >
          About Me <ArrowRightIcon :size="24" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
