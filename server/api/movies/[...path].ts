export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const path = event.context.params?.path
  const query = getQuery(event)

  // Asigurăm că path e array
  const pathArray = Array.isArray(path) ? path : path ? [path] : []

  const apiKey = config.tmdbApiKey
  const baseURL = config.tmdbBaseURL || "https://api.themoviedb.org/3/"

  let url = ""

  // 1) Search: /api/movies/search?query=Batman
  if (pathArray[0] === "search" && query.query) {
    url = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&page=1&query=${encodeURIComponent(query.query as string)}`
  }
  // 2) Movie details, credits, recommendations etc.
  else if (pathArray.length > 0) {
    url = `${baseURL}movie/${pathArray.join("/")}?api_key=${apiKey}&language=en-US`
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid API path"
    })
  }

  try {
    return await $fetch(url)
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `TMDB API error: ${err}`
    })
  }
})
