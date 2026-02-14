<script setup lang="ts">
defineOptions({
  name: 'WavePattern',
})

interface Props {
  /** CSS color value (e.g. var(--cream), #fff) */
  color?: string
  /** Opacity of the first (main) wave layer (0–1) */
  opacityPrimary?: number
  /** Opacity of the second wave layer (0–1) */
  opacitySecondary?: number
  /** Tailwind height classes (e.g. h-16 md:h-24) */
  heightClass?: string
  /** Flip the wave vertically (rotate 180°) */
  flip?: boolean
  /** Tailwind classes for the wrapper (e.g. bg-(--black)) */
  wrapperClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'var(--cream)',
  opacityPrimary: 0.06,
  opacitySecondary: 0.12,
  heightClass: 'h-16 md:h-24',
  flip: false,
  wrapperClass: '',
})
</script>

<template>
  <div
    class="relative w-full"
    :class="[props.wrapperClass, props.flip && 'rotate-180']"
    aria-hidden="true"
  >
    <svg
      class="w-full"
      :class="props.heightClass"
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
        :fill="props.color"
        :fill-opacity="props.opacityPrimary"
      />
      <path
        d="M0 90L48 82.5C96 75 192 60 288 52.5C384 45 480 45 576 52.5C672 60 768 75 864 82.5C960 90 1056 90 1152 82.5C1248 75 1344 60 1392 52.5L1440 45V120H0V90Z"
        :fill="props.color"
        :fill-opacity="props.opacitySecondary"
      />
    </svg>
  </div>
</template>
