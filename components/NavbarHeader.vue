<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import logoSvg from '~/assets/star_logo.svg?raw'
import { navLinks } from '~/constants/navLinks'

const route = useRoute()
const isAboutPage = computed(() => route.path === '/about')

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const useScrolledColors = computed(() => isScrolled.value || isMobileMenuOpen.value)

const linkClasses = computed(() =>
  useScrolledColors.value
    ? 'text-(--cream) hover:text-(--red)'
    : isAboutPage.value
      ? 'text-(--red) hover:text-(--green)'
      : 'text-(--cream) hover:text-(--red)'
)

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
      <NuxtLink
        to="/"
        class="inline-flex items-center transition-colors"
        :class="linkClasses"
        @click="closeMobileMenu"
      >
        <span
          class="inline-block size-16 [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
          v-html="logoSvg"
        ></span>
      </NuxtLink>
      <button
        @click="toggleMobileMenu"
        class="md:hidden flex flex-col justify-center items-center size-8 gap-1.5 transition-colors"
        :class="linkClasses"
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
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :exact-active-class="link.to === '/' ? 'active' : undefined"
        :active-class="link.to !== '/' ? 'active' : undefined"
        class="nav-link relative inline-block cursor-pointer transition-colors w-full md:w-auto text-center md:text-left py-2 md:py-0"
        :class="linkClasses"
        @click="closeMobileMenu"
      >
        {{ link.name }}
      </NuxtLink>
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
.nav-link.router-link-exact-active::after,
.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
}
</style>
