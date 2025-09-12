<template>
<Swiper
  :modules="['autoplay', 'effect-fade']"
  :slides-per-view="1"
  :loop="true"
  :speed="2600"
  :spaceBetween="20"
  effect="fade"
  :autoplay="{ delay: 2600, disableOnInteraction: true }"
>
  <SwiperSlide
    v-for="popular in popularMovies"
    :key="popular.id"
    class="animeslide-slide"
  >
    <div
      class="bg-slide"
      :style="{
        'background-image': `url(https://image.tmdb.org/t/p/original/${popular?.backdrop_path})`
      }"
    >
      <div class="container">
        <div class="description-container">
          <div class="description-card">
            <div class="description-card__header" data-animate="bottom">
              <h1>{{ popular.original_title }}</h1>
            </div>
            <div class="description-card__body" data-animate="bottom">
              <p>{{ popular.overview }}</p>
              <NuxtLink :to="`movies/${popular.id}`" class="button">Read More</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SwiperSlide>
</Swiper>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'

//const popularMovies = ref<any[]>([])


// fetch server-side / client
const { data, pending, error } = await useFetch('/api/movies/popular')

// când datele vin, le punem în ref
if (data.value?.results) {
  popularMovies.value = data.value.results
}
</script>
