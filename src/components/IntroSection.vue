<script setup lang="ts">
import MarqueeFill from './MarqueeFill.vue'
</script>

<template>
  <section class="relative min-h-screen bg-(--black) text-(--cream) p-8 overflow-hidden">
    <MarqueeFill text="Pura Coco" class="absolute inset-0" textClass="text-(--red) text-9xl h-24" />
    <div class="relative max-w-4xl mx-auto z-10">
      <h2 class="text-4xl mb-6">New Section</h2>
      <p class="text-lg">Content goes here.</p>
    </div>
  </section>
</template>
