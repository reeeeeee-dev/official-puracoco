<script setup lang="ts">
import fullBodyImage from '~/assets/full_body.jpg'
</script>

<template>
  <div class="relative h-screen snap-start snap-always overflow-hidden">
    <div class="h-full flex items-center justify-between">
      <div
        class="bg-(--black) text-(--cream) max-w-prose p-16 rounded-lg text-xl items-center flex flex-col gap-4 w-1/2"
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
      </div>

      <div class="w-1/2">
        <img :src="fullBodyImage" alt="Pura Coco" class="w-full h-full object-contain object-top" />
      </div>
    </div>
  </div>
</template>
