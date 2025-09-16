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
    // rutele dinamice: /movie/{id}, /movie/{id}/credits, /movie/{id}/recommendations
    // construim TMDB URL direct din path array
    url = `https://api.themoviedb.org/3/movie/${path.join('/')}`
    url += url.includes('?') ? `&api_key=${config.tmdbApiKey}&language=en-US` : `?api_key=${config.tmdbApiKey}&language=en-US`
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
