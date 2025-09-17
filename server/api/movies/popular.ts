export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const page = String(query.page || '1')
  
  const apiKey = config.tmdbApiKey
  const baseURL = config.tmdbBaseURL
  
  try {
    const response = await $fetch(`${baseURL}movie/popular`, {
      params: {
        api_key: apiKey,
        page,
        language: 'en-US',
        include_adult: false
      }
    })
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error retrieving popular movies'
    })
  }
})
