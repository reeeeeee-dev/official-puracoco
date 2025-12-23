export default defineEventHandler(async (event) => {
  // Access the secret from Cloudflare secrets store binding (production/cloudflare dev)
  // Falls back to environment variable for local nuxt dev
  const appId =
    event.context.cloudflare?.env?.BANDSINTOWN_APP_ID || useRuntimeConfig().bandsintownAppId

  if (!appId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Bandsintown API key not configured',
      data: {
        cf: event.context?.cloudflare,
        env: event.context?.env,
        runtimeConfig: useRuntimeConfig(),
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
