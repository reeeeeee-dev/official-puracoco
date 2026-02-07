<script setup lang="ts">
import NavbarHeader from '~/components/NavbarHeader.vue'
import LoadingScreen from '~/components/LoadingScreen.vue'
import FooterSection from '~/components/FooterSection.vue'

const route = useRoute()
</script>

<template>
  <LoadingScreen />
  <NavbarHeader />

  <div :class="route.path !== '/' ? 'flex flex-col min-h-screen' : ''">
    <NuxtPage :class="route.path !== '/' ? 'mt-16 grow' : ''" />
    <FooterSection v-if="route.path !== '/'" />
  </div>
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
