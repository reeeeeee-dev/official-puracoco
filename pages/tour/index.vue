<script setup lang="ts">
import type { BandsInTownEvent } from '~/types/bandsintown'

defineOptions({
  name: 'TourPage',
})

useHead({
  title: 'Tour | Pura Coco',
})

const filter = ref<'upcoming' | 'past'>('upcoming')

const { data, error, status } = await useFetch<BandsInTownEvent[]>('/api/events', {
  server: true,
  query: {
    filter,
  },
})
</script>

<template>
  <main class="flex text-(--cream) flex-col w-2xl mx-auto gap-8 my-auto h-dvh justify-center">
    <h1 class="text-3xl">Tour</h1>

    <div v-if="error" class="text-base max-w-prose">
      There was an error fetching the events. Please refresh the page or try again later.
    </div>

    <div v-else-if="status === 'pending'" class="text-base max-w-prose">Loading ...</div>

    <div v-else-if="status === 'success'" class="flex flex-col gap-4">
      <div class="flex gap-4 border-b border-(--cream) pb-2">
        <button
          @click="filter = 'upcoming'"
          class="hover:text-(--red) transition-colors cursor-pointer"
          :class="{ 'text-(--red)': filter === 'upcoming' }"
        >
          Upcoming
        </button>
        |
        <button
          @click="filter = 'past'"
          class="hover:text-(--red) transition-colors cursor-pointer"
          :class="{ 'text-(--red)': filter === 'past' }"
        >
          Past
        </button>
      </div>

      <div v-for="event in data" :key="event.id">
        <div class="flex gap-2 items-center justify-between border-b border-(--cream) pb-4">
          <NuxtLink
            :to="`/tour/${event.id}`"
            class="flex flex-col text-lg hover:text-(--red) transition-colors"
          >
            <div class="font-bold">
              {{ new Date(event.datetime).toLocaleDateString('en-US', { month: 'short' }) }}
              {{ new Date(event.datetime).getDate() }}
              {{ new Date(event.datetime).toLocaleDateString('en-US', { weekday: 'short' }) }}
              &nbsp;•&nbsp;
              {{
                new Date(event.datetime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}
            </div>
            <div class="font-thin">
              {{ event.venue.name }}
            </div>
            <div>{{ event.venue.city }}, {{ event.venue.country }}</div>
          </NuxtLink>
          <div class="flex gap-2">
            <a
              :href="event.offers?.find((offer) => offer.type === 'ticket')?.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-max items-center gap-2 bg-(--green) px-6 py-3 rounded-md hover:bg-(--red) transition-colors"
              v-if="event.offers?.find((offer) => offer.type === 'ticket')?.url"
            >
              <span>Buy Tickets</span>
              <ExternalLinkIcon class="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div v-if="data?.length === 0" class="text-base max-w-prose">No events found.</div>
    </div>
    <div class="flex flex-col justify-between">
      <NewsletterForm />
    </div>
  </main>
</template>
