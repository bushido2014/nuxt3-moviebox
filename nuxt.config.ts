// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-gtag'],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt Movie App',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },
  gtag: {
    id: 'G-L1M6JHWR6T'
  },
  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY, // server-only
    tmdbBaseURL: 'https://api.themoviedb.org/3/',
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      apiBase: process.env.NODE_ENV === 'production' 
        ? 'https://nuxt3movie-box.netlify.app' 
        : ''
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
});