<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string
  }>(),
  { color: 'var(--cream)' },
)
</script>

<template>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in">
    <div
      class="relative w-6 h-12 border-2 rounded-xl overflow-hidden"
      :style="{ borderColor: props.color }"
    >
      <div
        class="absolute left-1/2 top-2 -translate-x-1/2 size-2 rounded-full bounce-oval"
        :style="{ backgroundColor: props.color }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 1s ease-in;
}

.bounce-oval {
  animation: bounce-oval 2s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce-oval {
  0% {
    top: 8px;
    opacity: 0.3;
  }
  50% {
    top: 28px;
    opacity: 1;
  }
  100% {
    top: 8px;
    opacity: 0.3;
  }
}
</style>
