// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-swiper', 'nuxt-gtag'],
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
 
});
