<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'

const props = defineProps<{
  text: string
  textClass?: string
  class?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const marqueeHeight = ref(50) // Default height per marquee
const marqueeCount = ref(20) // Default fallback count

const calculateMarqueeCount = () => {
  if (containerRef.value) {
    const containerHeight = containerRef.value.clientHeight
    if (containerHeight > 0) {
      marqueeCount.value = Math.ceil(containerHeight / marqueeHeight.value)
    }
  }
}

onMounted(async () => {
  await nextTick()
  calculateMarqueeCount()

  // Recalculate on resize
  if (containerRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      calculateMarqueeCount()
    })
    resizeObserver.observe(containerRef.value)
  }
})

// Repeat text to fill the marquee width - duplicate for seamless loop
const repeatedText = computed(() => {
  const repeatCount = 20 // Enough to fill width
  const textWithSeparator = props.text + ' • '
  return textWithSeparator.repeat(repeatCount)
})

const spanCount = 8 // Number of spans for seamless looping
</script>

<template>
  <div ref="containerRef" class="w-full h-full overflow-hidden" :class="props.class">
    <marquee
      v-for="index in marqueeCount"
      :key="index"
      :direction="index % 2 === 0 ? 'left' : 'right'"
      behavior="scroll"
      loop="-1"
      class="w-full block text-(--cream)"
    >
      <span v-for="i in spanCount" :key="i" :class="props.textClass" class="inline-block">
        {{ repeatedText }}
      </span>
    </marquee>
  </div>
</template>
