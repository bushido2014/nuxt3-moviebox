export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  let path = event.context.params?.path
  if (!Array.isArray(path)) path = path ? [path] : []

  const query = getQuery(event)

  let url = ''

  if (path[0] === 'search') {
    // ruta de search: /api/movies/search?query=...
    url = `https://api.themoviedb.org/3/search/movie?api_key=${config.tmdbApiKey}&language=en-US&page=1&query=${encodeURIComponent(query.query || '')}`
  } else {
    // toate celelalte rute: /movie/{id} sau /movie/{id}/credits /recommendations
    url = `https://api.themoviedb.org/3/movie/${path.join('/')}?api_key=${config.tmdbApiKey}&language=en-US`
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
