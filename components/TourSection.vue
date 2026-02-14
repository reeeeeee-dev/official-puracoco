<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import type { BandsInTownEvent } from '~/types/bandsintown'

const { data, error, status } = await useFetch<BandsInTownEvent[]>('/api/events', {
  server: true,
  query: {
    filter: 'upcoming',
  },
})
</script>
<template>
  <div class="relative h-dvh bg-(--black) text-(--cream) z-0 snap-start snap-always">
    <div
      class="sticky snap-align-none top-16 w-full h-[calc(100vh-4rem)] flex items-center justify-center gap-48"
    >
      <div class="max-w-prose text-3xl">
        <p>Upcoming Shows</p>
      </div>
      <div class="flex flex-col gap-8">
        <div v-if="error" class="text-base max-w-prose">
          There was an error fetching the events. Please refresh the page or try again later.
        </div>
        <div v-else-if="status === 'pending'">Loading ...</div>
        <div v-else-if="status === 'success' && data?.length === 0">No upcoming shows</div>
        <div v-else-if="status === 'success'" class="flex flex-col gap-4">
          <NuxtLink
            v-for="event in data?.slice(0, 5)"
            :key="event.id"
            :to="`/tour/${event.id}`"
            class="bg-(--green) text-(--cream) p-4 rounded-md flex gap-2 justify-between items-center hover:bg-(--red) cursor-pointer transition-colors duration-300"
          >
            <div class="flex gap-6">
              <div class="flex flex-col items-center text-(--cream) font-bold">
                <div class="text-xl">
                  {{ new Date(event.datetime).toLocaleDateString('en-US', { month: 'short' }) }}
                </div>
                <div class="text-2xl">
                  {{ new Date(event.datetime).getDate() }}
                </div>
                <div class="text-lg">
                  {{
                    new Date(event.datetime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  }}
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex flex-col">
                  <div class="text-xl font-bold text-(--black)">
                    {{ event.venue.city }}
                  </div>
                  <div class="text-sm text-(--black)">
                    {{ event.venue.region }}, {{ event.venue.country }}
                  </div>
                </div>
                <div class="text-lg text-(--black)">{{ event.venue.name }}</div>
              </div>
            </div>
            <ArrowRightIcon class="size-6" />
          </NuxtLink>
        </div>
        <NuxtLink
          to="/tour"
          class="text-(--cream) p-4 flex gap-2 justify-between items-center hover:bg-(--green) cursor-pointer transition-all duration-300 bg-(--red) rounded-md"
        >
          <div class="flex gap-6">
            <div class="flex flex-col items-center">
              <div class="text-xl">See all events</div>
            </div>
          </div>
          <ArrowRightIcon class="size-6" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
