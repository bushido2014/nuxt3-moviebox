export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const path = event.context.params?.path

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing path',
    })
  }
  const query = getQuery(event)
  let url = ''

  if (path[0] === 'search') {
    if (!query.query) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Search query is required',
      })
    }
    url = `https://api.themoviedb.org/3/search/movie?api_key=${config.tmdbApiKey}&language=en-US&page=1&query=${encodeURIComponent(
      query.query as string
    )}`
  } else {
    
    url = `https://api.themoviedb.org/3/movie/${path.join(
      '/'
    )}?api_key=${config.tmdbApiKey}&language=en-US`
  }

  try {
    return await $fetch(url)
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `TMDB API error: ${err}`,
    })
  }
})
