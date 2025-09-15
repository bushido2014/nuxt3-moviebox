import { defineNuxtPlugin } from '#app'
import Swiper from 'swiper'
import 'swiper/css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swiper', Swiper)
})
