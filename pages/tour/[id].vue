<script setup lang="ts">
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-vue-next'
import type { BandsInTownEvent } from '~/types/bandsintown'

defineOptions({
  name: 'EventDetailPage',
})

const route = useRoute()
const eventId = route.params.id as string

const {
  data: events,
  error,
  status,
} = await useFetch<BandsInTownEvent[]>('/api/events', {
  server: true,
})

const event = computed(() => {
  if (!events.value) return null
  return events.value.find((e) => e.id === eventId)
})

const formattedDate = computed(() => {
  if (!event.value?.datetime) return ''
  const date = new Date(event.value.datetime)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const formattedTime = computed(() => {
  if (!event.value?.datetime) return ''
  const date = new Date(event.value.datetime)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
})

useHead({
  title: event.value
    ? `${event.value.venue.city} - ${formattedDate.value} | Pura Coco`
    : 'Event | Pura Coco',
})
</script>

<template>
  <main class="min-h-screen bg-(--black) text-(--cream) pt-16">
    <div class="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <!-- Back Button -->
      <NuxtLink
        to="/tour"
        class="inline-flex items-center gap-2 text-(--cream) hover:text-(--red) transition-colors mb-8"
      >
        <ArrowLeftIcon class="size-5" />
        <span>Back to Tour</span>
      </NuxtLink>

      <!-- Error State -->
      <div v-if="error" class="text-center py-16">
        <p class="text-xl mb-4">There was an error loading the event.</p>
        <NuxtLink
          to="/tour"
          class="inline-block bg-(--green) text-(--cream) px-6 py-3 rounded-md hover:bg-(--red) transition-colors"
        >
          Return to Tour
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-else-if="status === 'pending'" class="text-center py-16">
        <p class="text-xl">Loading event...</p>
      </div>

      <!-- Event Not Found -->
      <div v-else-if="status === 'success' && !event" class="text-center py-16">
        <p class="text-xl mb-4">Event not found.</p>
        <NuxtLink
          to="/tour"
          class="inline-block bg-(--green) text-(--cream) px-6 py-3 rounded-md hover:bg-(--red) transition-colors"
        >
          Return to Tour
        </NuxtLink>
      </div>

      <!-- Event Details -->
      <div v-else-if="event" class="space-y-8">
        <!-- Date and Time -->
        <div class="bg-(--green) p-6 md:p-8 rounded-md">
          <div class="flex items-start gap-4 mb-4">
            <CalendarIcon class="size-6 text-(--cream) shrink-0 mt-1" />
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-(--cream) mb-2">
                {{ formattedDate }}
              </h1>
              <p class="text-xl text-(--cream)">{{ formattedTime }}</p>
            </div>
          </div>
        </div>

        <!-- Venue Information -->
        <div class="bg-(--green) p-6 md:p-8 rounded-md">
          <div class="flex items-start gap-4">
            <MapPinIcon class="size-6 text-(--cream) shrink-0 mt-1" />
            <div class="flex-1">
              <h2 class="text-2xl md:text-3xl font-bold text-(--cream) mb-2">
                {{ event.venue.name }}
              </h2>
              <p class="text-lg text-(--cream) mb-1">
                {{ event.venue.city }}, {{ event.venue.region }}
              </p>
              <p class="text-base text-(--cream) opacity-90">{{ event.venue.country }}</p>
            </div>
          </div>
        </div>

        <!-- Event Title/Description -->
        <div v-if="event.title || event.description" class="bg-(--green) p-6 md:p-8 rounded-md">
          <h2 v-if="event.title" class="text-2xl font-bold text-(--cream) mb-4">
            {{ event.title }}
          </h2>
          <p
            v-if="event.description"
            class="text-lg text-(--cream) whitespace-pre-line"
            v-html="event.description"
          ></p>
        </div>

        <!-- Lineup -->
        <div
          v-if="event.lineup && event.lineup.length > 0"
          class="bg-(--green) p-6 md:p-8 rounded-md"
        >
          <h2 class="text-2xl font-bold text-(--cream) mb-4">Lineup</h2>
          <ul class="space-y-2">
            <li v-for="(artist, index) in event.lineup" :key="index" class="text-lg text-(--cream)">
              {{ artist }}
            </li>
          </ul>
        </div>

        <!-- Ticket Offers -->
        <div
          v-if="event.offers && event.offers.length > 0"
          class="bg-(--green) p-6 md:p-8 rounded-md"
        >
          <h2 class="text-2xl font-bold text-(--cream) mb-4">Tickets</h2>
          <div class="flex flex-col gap-3">
            <a
              v-for="offer in event.offers"
              :key="offer.url"
              :href="offer.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-(--black) text-(--cream) px-6 py-3 rounded-md hover:bg-(--red) transition-colors w-fit"
            >
              <span>{{ offer.type }}</span>
              <ExternalLinkIcon class="size-4" />
            </a>
          </div>
        </div>

        <!-- BandsInTown Link -->
        <div class="bg-(--green) p-6 md:p-8 rounded-md">
          <a
            :href="event.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-(--black) text-(--cream) px-6 py-3 rounded-md hover:bg-(--red) transition-colors"
          >
            <span>View on BandsInTown</span>
            <ExternalLinkIcon class="size-4" />
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
