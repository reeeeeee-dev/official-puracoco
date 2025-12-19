<script setup lang="ts">
import NavbarHeader from '~/components/NavbarHeader.vue'
import LoadingScreen from '~/components/LoadingScreen.vue'

const route = useRoute()
</script>

<template>
  <LoadingScreen />
  <NavbarHeader />

  <NuxtPage :class="route.path !== '/' ? 'mt-16' : ''" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
