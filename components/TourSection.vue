<script setup lang="ts">
const { data, error, status } = await useFetch('/api/events', {
  server: true,
})
</script>
<template>
  <div class="relative h-[calc(200vh-4rem)] bg-(--black) text-(--cream) z-0 snap-start snap-always">
    <div
      class="sticky snap-align-none top-16 w-full h-[calc(100vh-4rem)] flex items-center justify-center gap-48"
    >
      <div class="max-w-prose text-3xl">
        <p>Upcoming Shows</p>
      </div>
      <div class="flex flex-col gap-8">
        <h3 class="text-3xl">Past Shows</h3>
        <div v-if="error" class="text-base max-w-prose">
          There was an error fetching the events. Please refresh the page or try again later.
        </div>
        <div v-else-if="status === 'pending'">Loading ...</div>
        <div v-else-if="status === 'success'">
          {{ JSON.stringify(data) }}
        </div>
      </div>
    </div>
  </div>
</template>
