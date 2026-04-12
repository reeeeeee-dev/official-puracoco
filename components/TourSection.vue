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
  <div class="relative min-h-dvh bg-(--black) text-(--cream) z-0 py-20 lg:py-0">
    <div
      class="w-full min-h-[calc(100dvh-5rem)] lg:h-[calc(100dvh-4rem)] flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-24 2xl:gap-48 px-4 sm:px-6"
    >
      <div class="max-w-prose text-2xl sm:text-3xl text-center lg:text-left shrink-0">
        <p>Upcoming Shows</p>
      </div>
      <div class="flex flex-col gap-6 sm:gap-8 w-full max-w-xl lg:max-w-none lg:w-auto">
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
            class="bg-(--green) text-(--cream) p-3 sm:p-4 rounded-md flex flex-row gap-3 justify-between items-center hover:bg-(--red) cursor-pointer transition-colors duration-300"
          >
            <div class="flex flex-1 min-w-0 flex-col sm:flex-row gap-4 sm:gap-6">
              <div
                class="flex flex-row sm:flex-col justify-between sm:justify-start gap-2 sm:gap-0 sm:items-center text-(--cream) font-bold shrink-0"
              >
                <div class="text-lg sm:text-xl">
                  {{ new Date(event.datetime).toLocaleDateString('en-US', { month: 'short' }) }}
                </div>
                <div class="text-xl sm:text-2xl">
                  {{ new Date(event.datetime).getDate() }}
                </div>
                <div class="text-base sm:text-lg">
                  {{
                    new Date(event.datetime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  }}
                </div>
              </div>
              <div class="flex flex-col gap-1 sm:gap-2 min-w-0">
                <div class="flex flex-col">
                  <div class="text-lg sm:text-xl font-bold text-(--black)">
                    {{ event.venue.city }}
                  </div>
                  <div class="text-xs sm:text-sm text-(--black)">
                    {{ event.venue.region }}, {{ event.venue.country }}
                  </div>
                </div>
                <div class="text-base sm:text-lg text-(--black) break-words">
                  {{ event.venue.name }}
                </div>
              </div>
            </div>
            <ArrowRightIcon class="size-5 sm:size-6 shrink-0" />
          </NuxtLink>
        </div>
        <NuxtLink
          to="/tour"
          class="text-(--cream) p-3 sm:p-4 flex gap-2 justify-between items-center hover:bg-(--green) cursor-pointer transition-all duration-300 bg-(--red) rounded-md"
        >
          <div class="flex gap-4 sm:gap-6 min-w-0">
            <div class="flex flex-col justify-center">
              <div class="text-lg sm:text-xl">See all events</div>
            </div>
          </div>
          <ArrowRightIcon class="size-5 sm:size-6 shrink-0" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
