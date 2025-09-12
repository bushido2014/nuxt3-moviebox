export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  let path = event.context.params?.path

  // dacă path e string (ex: "search") îl transformăm în array
  if (!Array.isArray(path)) path = path ? [path] : []

  const query = getQuery(event).query as string

  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${config.tmdbApiKey}&language=en-US&page=1&query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/movie/${path.join("/")}?api_key=${config.tmdbApiKey}&language=en-US`

  try {
    return await $fetch(url)
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `TMDB API error: ${err}`,
    })
  }
})
