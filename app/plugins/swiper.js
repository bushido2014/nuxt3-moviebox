import { defineNuxtPlugin } from '#app'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swiper', Swiper)
})
