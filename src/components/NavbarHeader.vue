<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex justify-between items-center gap-4 h-16 bg-black text-white px-16">
    <RouterLink to="/">
      <img src="/star_logo.png" alt="Pura Coco" class="w-10 h-10" />
    </RouterLink>
    <div class="flex items-center gap-4">
      <RouterLink
        to="/"
        exact-active-class="active"
        class="nav-link transition-colors text-(--cream) hover:text-(--red)"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/about"
        active-class="active"
        class="nav-link transition-colors text-(--cream) hover:text-(--red)"
      >
        About
      </RouterLink>
      <RouterLink
        to="/music"
        active-class="active"
        class="nav-link transition-colors text-(--cream) hover:text-(--red)"
      >
        Music
      </RouterLink>
      <RouterLink
        to="/tour"
        active-class="active"
        class="nav-link transition-colors text-(--cream) hover:text-(--red)"
      >
        Tour
      </RouterLink>
      <RouterLink
        to="/press"
        active-class="active"
        class="nav-link transition-colors text-(--cream) hover:text-(--red)"
      >
        Press
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
  display: inline-block;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease;
}

.nav-link:hover::after {
  transform: scaleX(0.6);
}

.nav-link.active::after,
.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after {
  transform: scaleX(1);
}
</style>
