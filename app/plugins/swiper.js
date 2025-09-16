import { defineNuxtPlugin } from '#app'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swiper', Swiper)
})
