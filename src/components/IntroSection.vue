<script setup lang="ts">
import MarqueeFill from './MarqueeFill.vue'
</script>

<template>
  <div class="relative h-[300vh]">
    <!-- Sticky background across both sections -->
    <div class="sticky snap-align-none top-0 w-full h-screen z-0 bg-(--cream)">
      <MarqueeFill
        text="Pura Coco"
        class="absolute inset-0 w-full h-full font-[Poppins] font-bold"
        textClass="text-(--red) text-9xl h-24 uppercase"
      />
      <img
        src="@/assets/portrait1.png"
        alt="Pura Coco"
        class="absolute w-full h-full object-cover object-top"
      />
    </div>

    <!-- First section -->
    <div class="relative h-screen snap-start snap-stop z-10 -mt-screen bg-transparent">
      <div class="h-full flex items-center justify-center">
        <div>Some text</div>
      </div>
    </div>

    <!-- Second section -->
    <div class="relative h-screen snap-start snap-stop z-10 bg-transparent">
      <div class="h-full flex items-center justify-center">
        <div>Some text</div>
      </div>
    </div>
  </div>
</template>
