<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarHeader from './components/NavbarHeader.vue'
</script>

<template>
  <NavbarHeader />

  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :class="route.path !== '/' ? 'mt-16' : ''" />
    </Transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
