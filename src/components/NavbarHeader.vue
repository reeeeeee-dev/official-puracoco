<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import logoSvg from '@/assets/star_logo.svg?raw'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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
    class="fixed top-0 left-0 w-full flex flex-col md:flex-row justify-between items-center h-auto md:h-16 px-4 md:px-16 transition-all duration-300 z-40"
    :class="{
      'bg-black gap-4': isScrolled || isMobileMenuOpen,
      'bg-transparent gap-0 md:gap-4': !isScrolled && !isMobileMenuOpen,
    }"
  >
    <div class="flex justify-between items-center w-full md:w-auto h-16">
      <RouterLink
        to="/"
        class="inline-flex items-center text-(--cream) hover:text-(--red) transition-colors"
        @click="closeMobileMenu"
      >
        <span
          class="inline-block w-16 h-16 [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
          v-html="logoSvg"
        ></span>
      </RouterLink>
      <button
        @click="toggleMobileMenu"
        class="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-(--cream) hover:text-(--red) transition-colors"
        aria-label="Toggle menu"
      >
        <span
          class="block w-6 h-0.5 bg-current transition-all duration-300"
          :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen, '': !isMobileMenuOpen }"
        ></span>
        <span
          class="block w-6 h-0.5 bg-current transition-all duration-300"
          :class="{ 'opacity-0': isMobileMenuOpen, 'opacity-100': !isMobileMenuOpen }"
        ></span>
        <span
          class="block w-6 h-0.5 bg-current transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen, '': !isMobileMenuOpen }"
        ></span>
      </button>
    </div>
    <div
      class="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto overflow-hidden transition-all duration-300"
      :class="{
        'max-h-96 opacity-100 pb-4': isMobileMenuOpen,
        'max-h-0 opacity-0 md:max-h-none md:opacity-100 pb-0 md:pb-0': !isMobileMenuOpen,
      }"
    >
      <RouterLink
        to="/"
        exact-active-class="active"
        class="nav-link relative inline-block cursor-pointer transition-colors text-(--cream) hover:text-(--red) w-full md:w-auto text-center md:text-left py-2 md:py-0"
        @click="closeMobileMenu"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/about"
        active-class="active"
        class="nav-link relative inline-block cursor-pointer transition-colors text-(--cream) hover:text-(--red) w-full md:w-auto text-center md:text-left py-2 md:py-0"
        @click="closeMobileMenu"
      >
        About
      </RouterLink>
      <RouterLink
        to="/music"
        active-class="active"
        class="nav-link relative inline-block cursor-pointer transition-colors text-(--cream) hover:text-(--red) w-full md:w-auto text-center md:text-left py-2 md:py-0"
        @click="closeMobileMenu"
      >
        Music
      </RouterLink>
      <RouterLink
        to="/tour"
        active-class="active"
        class="nav-link relative inline-block cursor-pointer transition-colors text-(--cream) hover:text-(--red) w-full md:w-auto text-center md:text-left py-2 md:py-0"
        @click="closeMobileMenu"
      >
        Tour
      </RouterLink>
      <RouterLink
        to="/press"
        active-class="active"
        class="nav-link relative inline-block cursor-pointer transition-colors text-(--cream) hover:text-(--red) w-full md:w-auto text-center md:text-left py-2 md:py-0"
        @click="closeMobileMenu"
      >
        Press
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
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
