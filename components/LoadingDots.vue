<script setup lang="ts">
interface Props {
  size?: string
  color?: string
  gap?: string
}

withDefaults(defineProps<Props>(), {
  size: 'size-2',
  color: 'bg-(--cream)',
  gap: 'gap-2',
})
</script>

<template>
  <div class="flex" :class="gap">
    <div class="rounded-full animate-bounce" :class="[size, color]" style="animation-delay: 0s" />
    <div class="rounded-full animate-bounce" :class="[size, color]" style="animation-delay: 0.2s" />
    <div class="rounded-full animate-bounce" :class="[size, color]" style="animation-delay: 0.4s" />
  </div>
</template>
