export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Movie ID is required'
    })
  }

  try {
    const response = await $fetch(`${config.tmdbBaseURL}movie/${id}/recommendations`, {
      params: {
        api_key: config.tmdbApiKey,
        language: 'en-US'
      }
    })
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error retrieving movie recommendations'
    })
  }
})
