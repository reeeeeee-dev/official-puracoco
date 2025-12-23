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

const ticketUrl = computed(() => event.value?.offers?.find((offer) => offer.type === 'ticket')?.url)
const rsvpUrl = computed(() => {
  const url = new URL(event.value?.url ?? '')
  url.searchParams.set('trigger', 'rsvp_going')
  return url.toString()
})

useHead({
  title: event.value
    ? `${event.value.venue.city} - ${formattedDate.value} | Pura Coco`
    : '404 | Pura Coco',
})
</script>

<template>
  <main class="bg-(--black) text-(--cream) p-16">
    <div class="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <!-- Back Button -->
      <NuxtLink
        to="/tour"
        class="inline-flex items-center gap-2 hover:text-(--red) transition-colors mb-8"
      >
        <ArrowLeftIcon class="size-5" />
        <span>Back to Tour</span>
      </NuxtLink>

      <!-- Error State -->
      <div v-if="error" class="text-center py-16">
        <p class="text-xl mb-4">
          There was an error loading the event. Try refreshing the page or check again later.
        </p>
      </div>

      <!-- Loading State -->
      <div v-else-if="status === 'pending'" class="text-center py-16">
        <p class="text-xl">Loading event...</p>
      </div>

      <!-- Event Not Found -->
      <div v-else-if="status === 'success' && !event" class="text-center py-16">
        <p class="text-xl mb-4">Event not found.</p>
      </div>

      <!-- Event Details -->
      <div v-else-if="event" class="flex flex-col gap-4 max-w-prose">
        <div
          v-if="new Date(event.datetime) < new Date()"
          class="bg-(--cream) text-(--black) p-4 rounded-md"
        >
          This event has passed.
        </div>

        <div v-if="event.sold_out" class="bg-(--red) text-(--cream) p-4 rounded-md">
          This event is sold out
        </div>

        <div class="flex flex-col gap-4 border border-(--cream) rounded-md p-4">
          <!-- Date and Time -->
          <div class="flex items-start gap-4">
            <CalendarIcon class="size-6 shrink-0 mt-1" />
            <div>
              <h1 class="text-3xl md:text-4xl font-bold mb-2">
                {{ formattedDate }}
              </h1>
              <p class="text-xl">{{ formattedTime }}</p>
            </div>
          </div>

          <!-- Venue Information -->
          <div class="flex items-start gap-4">
            <MapPinIcon class="size-6 shrink-0 mt-1" />
            <div class="flex-1">
              <h2 class="text-xl md:text-2xl font-bold mb-2">
                {{ event.venue.name }}
              </h2>
              <p class="text-lg mb-1">
                {{ event.venue.street_address }}
              </p>
              <p class="text-lg mb-1">
                {{ event.venue.city }}, {{ event.venue.region }} {{ event.venue.postal_code }}
              </p>
              <p class="text-base opacity-90">{{ event.venue.country }}</p>
            </div>
          </div>
        </div>

        <!-- Lineup -->
        <div v-if="event.lineup && event.lineup.length > 0" class="flex gap-4">
          <h2 class="text-2xl font-bold">Lineup</h2>
          <div class="flex gap-2 flex-col flex-wrap">
            <div v-for="(artist, index) in event.lineup" :key="index" class="text-lg flex gap-2">
              {{ artist }}
            </div>
          </div>
        </div>

        <!-- Event Title/Description -->
        <div v-if="event.title || event.description">
          <h2 v-if="event.title" class="text-2xl font-bold">
            {{ event.title }}
          </h2>
          <p
            v-if="event.description"
            class="text-lg whitespace-pre-line"
            v-html="event.description"
          ></p>
        </div>

        <div class="flex gap-4">
          <a
            :href="ticketUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-max items-center gap-2 bg-(--green) px-6 py-3 rounded-md hover:bg-(--red) transition-colors"
            v-if="ticketUrl"
          >
            <span>Buy Tickets</span>
            <ExternalLinkIcon class="size-4" />
          </a>
          <a
            :href="rsvpUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-max items-center gap-2 bg-(--green) px-6 py-3 rounded-md hover:bg-(--red) transition-colors"
            v-if="rsvpUrl"
          >
            <span>Sign up for updates</span>
            <ExternalLinkIcon class="size-4" />
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
