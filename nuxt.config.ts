import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-25',
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/main.css'],

  app: {
    head: {
      title: 'Pura Coco',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'title', content: 'Pura Coco' },
        {
          name: 'description',
          content:
            'Pura Coco is an electrifying Alternative R&B singer/songwriter hailing from Northwest Arkansas. Infusing her music with the rich influences of her Latin roots and southern upbringing, Coco crafts a distinctive sound that is both deeply resonant and refreshingly unique.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://officialpuracoco.com/' },
        { property: 'og:title', content: 'Pura Coco' },
        {
          property: 'og:description',
          content:
            'Pura Coco is an electrifying Alternative R&B singer/songwriter hailing from Northwest Arkansas. Infusing her music with the rich influences of her Latin roots and southern upbringing, Coco crafts a distinctive sound that is both deeply resonant and refreshingly unique.',
        },
        { property: 'og:image', content: '/star_logo.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://officialpuracoco.com/' },
        { property: 'twitter:title', content: 'Pura Coco' },
        {
          property: 'twitter:description',
          content:
            'Pura Coco is an electrifying Alternative R&B singer/songwriter hailing from Northwest Arkansas. Infusing her music with the rich influences of her Latin roots and southern upbringing, Coco crafts a distinctive sound that is both deeply resonant and refreshingly unique.',
        },
        { property: 'twitter:image', content: '/star_logo.png' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      duration: 500,
    },
  },

  nitro: {
    preset: 'cloudflare',
  },

  runtimeConfig: {
    bandsintownAppId: process.env.BANDSINTOWN_APP_ID,
    public: {},
  },

  // Router scroll behavior is handled via page meta or composables
})
