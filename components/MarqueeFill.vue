<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'

const props = defineProps<{
  text: string
  textClass?: string
  class?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const marqueeHeight = ref(50) // Default height per marquee
// Start with a safe default for SSR, will be recalculated on mount
// Always use the same initial value for SSR and client to avoid hydration mismatch
const marqueeCount = ref(20)

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
  const textWithSeparator = props.text + ' '
  return textWithSeparator.repeat(repeatCount)
})

const spanCount = 8 // Number of spans for seamless looping
</script>

<template>
  <div ref="containerRef" class="w-full h-full overflow-hidden" :class="props.class">
    <div
      v-for="index in marqueeCount"
      :key="index"
      class="w-full block text-(--cream) overflow-hidden"
    >
      <div
        :class="[
          'inline-flex whitespace-nowrap will-change-transform',
          index % 2 === 0 ? 'marquee-left' : 'marquee-right',
        ]"
        :style="{ transform: index % 2 === 0 ? 'translateX(0)' : 'translateX(-50%)' }"
      >
        <span v-for="i in spanCount * 2" :key="i" :class="props.textClass" class="inline-block">
          {{ repeatedText }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-left {
  animation: marquee-left 4800s linear 1s infinite;
}

.marquee-right {
  animation: marquee-right 4800s linear 1s infinite;
}

@keyframes marquee-left {
  from {
    transform: translateX(-12.5%);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  from {
    transform: translateX(-37.5%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
