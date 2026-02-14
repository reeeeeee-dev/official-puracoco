<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next'
import { streamingServices } from '~/constants/streamingServices'
import { navLinks } from '~/constants/navLinks'
import NewsletterForm from '~/components/NewsletterForm.vue'
</script>

<template>
  <div class="flex flex-col items-end bg-(--black)">
    <WavePattern wrapper-class="bg-(--black)" />
    <footer class="bg-(--black) text-(--cream) border-t border-(--cream)/20">
      <div class="mx-auto px-4 md:px-16 py-12 md:py-16">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          <!-- Brand Section -->
          <div class="flex flex-col gap-4">
            <h2 class="text-2xl md:text-3xl font-bold text-(--red)">Pura Coco</h2>
            <p class="text-sm md:text-base opacity-80 leading-relaxed max-w-prose">
              Alternative R&B singer/songwriter from Northwest Arkansas. Infusing music with Latin
              roots and southern influences.
            </p>
          </div>

          <!-- Navigation Links -->
          <div class="flex flex-col gap-4">
            <h3 class="text-lg md:text-xl font-semibold">Navigation</h3>
            <nav class="flex flex-col gap-2">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.name"
                :to="link.to"
                class="text-sm md:text-base opacity-80 hover:text-(--red) hover:opacity-100 transition-colors duration-200 w-fit"
              >
                {{ link.name }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Streaming Links -->
          <div class="flex flex-col gap-4">
            <h3 class="text-lg md:text-xl font-semibold">Stream & Connect</h3>
            <div class="flex flex-col gap-2">
              <a
                v-for="service in streamingServices"
                :key="service.name"
                :href="service.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm md:text-base opacity-80 hover:text-(--red) hover:opacity-100 transition-colors duration-200 w-fit group"
              >
                <component
                  :is="service.icon"
                  :size="18"
                  class="group-hover:scale-110 transition-transform"
                />
                <span>{{ service.name }}</span>
              </a>
            </div>
          </div>

          <div
            class="flex flex-col gap-4 items-center justify-center overflow-visible h-full w-full"
          >
            <NewsletterForm />
          </div>
        </div>

        <!-- Bottom Bar -->
        <div
          class="border-t border-(--cream)/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 mb-12"
        >
          <p class="text-xs md:text-sm opacity-60">
            © {{ new Date().getFullYear() }} Pura Coco. All rights reserved.
          </p>
          <div class="flex items-center">
            Website thoughtfully crafted by &nbsp;
            <a
              href="https://reetikpatel.me"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-(--red) transition-colors duration-200 flex items-center gap-2"
            >
              Reetik Patel <ExternalLinkIcon :size="16" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
