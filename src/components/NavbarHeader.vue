<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="absolute top-0 left-0 w-full flex justify-between items-center gap-4 h-16 text-white px-16 transition-all duration-300 z-50"
    :class="{ 'bg-black': isScrolled, 'bg-transparent': !isScrolled }"
  >
    <RouterLink to="/">
      <img src="/star_logo.png" alt="Pura Coco" class="w-10 h-10" />
    </RouterLink>
    <div class="flex items-center gap-8">
      <RouterLink
        to="/"
        exact-active-class="active"
        class="nav-link cursor-pointer transition-colors text-(--cream) hover:text-(--red)"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/about"
        active-class="active"
        class="nav-link cursor-pointer transition-colors text-(--cream) hover:text-(--red)"
      >
        About
      </RouterLink>
      <RouterLink
        to="/music"
        active-class="active"
        class="nav-link cursor-pointer transition-colors text-(--cream) hover:text-(--red)"
      >
        Music
      </RouterLink>
      <RouterLink
        to="/tour"
        active-class="active"
        class="nav-link cursor-pointer transition-colors text-(--cream) hover:text-(--red)"
      >
        Tour
      </RouterLink>
      <RouterLink
        to="/press"
        active-class="active"
        class="nav-link cursor-pointer transition-colors text-(--cream) hover:text-(--red)"
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
