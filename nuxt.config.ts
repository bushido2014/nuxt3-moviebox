export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-gtag'],
  gtag: {
    id: 'G-L1M6JHWR6T'
  },
  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY, // server-only
    tmdbBaseURL: 'https://api.themoviedb.org/3/',
    public: {
      apiBase: '/api' // <--- mereu local, Netlify se ocupă de funcții
    }
  },
  nitro: {
    preset: 'netlify',
    experimental: {
      wasm: false
    },
    routeRules: {
      '/api/**': { 
        cors: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    }
  },
})
