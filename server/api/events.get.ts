export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const appId = config.bandsintownAppId

  if (!appId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Bandsintown API key not configured',
    })
  }

  try {
    const response = await $fetch(
      `https://rest.bandsintown.com/artists/Pura Coco/events/?app_id=${appId}`,
    )
    return response
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch events from Bandsintown',
    })
  }
})
