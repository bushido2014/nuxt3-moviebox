export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
   const { id } = event.context.params

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Movie ID is required'
    })
  }
const apiKey = config.tmdbApiKey
const baseURL = config.tmdbBaseURL


  try {
    const response = await $fetch(`${baseURL}movie/${id}/recommendations`, {
      params: {
        api_key: apiKey,
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
