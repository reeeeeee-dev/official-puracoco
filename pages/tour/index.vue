<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next'
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
  <main
    class="flex text-(--cream) flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 gap-6 sm:gap-8 py-8 pb-16 min-h-[calc(100dvh-4rem)]"
  >
    <h1 class="text-2xl sm:text-3xl shrink-0">Tour</h1>

    <div v-if="error" role="alert" class="text-base max-w-prose">
      There was an error fetching the events. Please refresh the page or try again later.
    </div>

    <div
      v-else-if="status === 'pending'"
      role="status"
      aria-live="polite"
      class="text-base max-w-prose"
    >
      Loading ...
    </div>

    <div v-else-if="status === 'success'" class="flex flex-col gap-4 pb-8">
      <div
        role="group"
        aria-label="Filter events"
        class="flex gap-4 border-b border-(--cream) pb-2"
      >
        <button
          @click="filter = 'upcoming'"
          :aria-pressed="filter === 'upcoming'"
          class="hover:text-(--red) transition-colors cursor-pointer"
          :class="{ 'text-(--red)': filter === 'upcoming' }"
        >
          Upcoming
        </button>
        <span aria-hidden="true">|</span>
        <button
          @click="filter = 'past'"
          :aria-pressed="filter === 'past'"
          class="hover:text-(--red) transition-colors cursor-pointer"
          :class="{ 'text-(--red)': filter === 'past' }"
        >
          Past
        </button>
      </div>
      <div aria-live="polite" aria-atomic="true" class="sr-only">
        Showing {{ filter }} events{{ data?.length ? `: ${data.length} found` : '' }}
      </div>

      <div v-for="event in data" :key="event.id">
        <div
          class="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:items-center sm:justify-between border-b border-(--cream) pb-4"
        >
          <NuxtLink
            :to="`/tour/${event.id}`"
            class="flex flex-col text-base sm:text-lg hover:text-(--red) transition-colors min-w-0"
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
          <div class="flex gap-2 shrink-0">
            <a
              :href="event.offers?.find((offer) => offer.type === 'ticket')?.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Buy tickets for ${event.venue.city} show (opens in new tab)`"
              class="inline-flex w-full sm:w-max justify-center items-center gap-2 bg-(--green) px-4 sm:px-6 py-2.5 sm:py-3 rounded-md hover:bg-(--red) transition-colors text-sm sm:text-base"
              v-if="event.offers?.find((offer) => offer.type === 'ticket')?.url"
            >
              <span>Buy Tickets</span>
              <ExternalLinkIcon class="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div v-if="data?.length === 0" class="text-base max-w-prose">No events found.</div>
    </div>
  </main>
</template>
