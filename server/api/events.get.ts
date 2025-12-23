export default defineEventHandler(async (event) => {
  const filter = getQuery(event).filter ?? ('all' as 'upcoming' | 'past' | 'all' | undefined)

  const appId = process.env.BANDSINTOWN_APP_ID

  if (!appId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Bandsintown API key not configured',
    })
  }

  try {
    const response = await $fetch(
      `https://rest.bandsintown.com/artists/Pura Coco/events/?app_id=${appId}&date=${filter}`,
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
