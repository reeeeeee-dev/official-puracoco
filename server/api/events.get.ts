export default defineEventHandler(async (event) => {
  const appId = process.env.BANDSINTOWN_APP_ID

  if (!appId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Bandsintown API key not configured',
      data: {
        cf: event.context?.cloudflare,
        env: event.context?.env,
        runtimeConfig: useRuntimeConfig(event),
        process: !!process.env.BANDSINTOWN_APP_ID ? 'present' : 'missing',
      },
    })
  }

  try {
    const response = await $fetch(
      `https://rest.bandsintown.com/artists/Pura Coco/events/?app_id=${appId}&date=past`,
    )
    return response
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch events from Bandsintown',
      data: error,
    })
  }
})
