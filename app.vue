<script setup lang="ts">
import NavbarHeader from '~/components/NavbarHeader.vue'
import LoadingScreen from '~/components/LoadingScreen.vue'
import FooterSection from '~/components/FooterSection.vue'

const route = useRoute()
</script>

<template>
  <div>
    <!-- Skip to main content for keyboard / screen-reader users -->
    <a
      href="#main-content"
      class="skip-link sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-(--red) focus:px-4 focus:py-2 focus:text-(--cream) focus:shadow-lg"
    >
      Skip to main content
    </a>

    <LoadingScreen />
    <NavbarHeader />

    <!-- Hidden iframe to preload newsletter form -->
    <ClientOnly>
      <iframe
        src="https://bandsintown.com/artist/15542693/email_signup_form?headerTextColor=rgba(255,207,153,1)&backgroundColor=rgba(12,15,10,1)&ctaBackgroundColor=rgba(242,67,51,1)&title=MAILING LIST&headerTextStyle=normal&headerText=Sign up to get the latest updates&font=Poppins&ctaIcon=show&ctaBorderRadius=4px&ctaBorderWidth=2px&ctaBorderColor=rgba(12,15,10,1)&ctaFontColor=rgba(255,207,153,1)&alignment=center&emailInputField=show&ctaLabel=Subscribe&layout=narrow&locale=en&ctaSize=small&affilCode=&appId=f37e48c6eccbf2f3b16b571955266fd0"
        class="fixed -left-[9999px] -top-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        aria-hidden="true"
        tabindex="-1"
      />
    </ClientOnly>

    <div
      id="main-content"
      :class="route.path !== '/' && route.path !== '/about' ? 'flex flex-col min-h-screen' : ''"
    >
      <NuxtPage :class="route.path !== '/' && route.path !== '/about' ? 'mt-16 grow' : ''" />
      <FooterSection v-if="route.path !== '/' && route.path !== '/about'" />
    </div>
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

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
