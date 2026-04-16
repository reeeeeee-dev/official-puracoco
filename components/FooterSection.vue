<script setup lang="ts">
import { ExternalLinkIcon, InstagramIcon, FacebookIcon } from 'lucide-vue-next'
import NewsletterForm from '~/components/NewsletterForm.vue'
</script>

<template>
  <div class="flex flex-col items-stretch bg-(--black)">
    <WavePattern wrapper-class="bg-(--black)" />
    <footer class="bg-(--black) text-(--cream) border-t border-(--cream)/20">
      <div class="mx-auto px-4 md:px-16 py-12 md:py-16">
        <!-- Main Footer Content -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-4 justify-items-center text-center md:text-left md:justify-items-start"
        >
          <!-- Brand Section -->
          <div class="flex flex-col gap-4 text-left justify-self-start self-center">
            <h2 class="text-2xl md:text-3xl font-bold text-(--red)">Pura Coco</h2>
            <div class="flex gap-4">
              <a
                href="https://www.instagram.com/puracocoo/"
                target="_blank"
                rel="noopener noreferrer"
                class="opacity-80 hover:text-(--red) hover:opacity-100 transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon :size="22" />
              </a>
              <a
                href="https://www.facebook.com/puracoco/"
                target="_blank"
                rel="noopener noreferrer"
                class="opacity-80 hover:text-(--red) hover:opacity-100 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon :size="22" />
              </a>
            </div>
          </div>

          <div
            class="flex flex-col gap-4 items-center justify-center overflow-visible h-full w-full justify-self-stretch"
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
              class="hover:text-(--red) transition-colors duration-200 inline-flex items-center gap-2 underline"
            >
              Reetik Patel <ExternalLinkIcon :size="16" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
