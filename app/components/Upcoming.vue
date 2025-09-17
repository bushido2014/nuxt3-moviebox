<template>
  <section class="top-rated">
    <div class="container">
      <div class="section-title">
        <h2>Upcoming Movies</h2>
      </div>
      <client-only>
        <Swiper
          :modules="[Navigation]"
          :breakpoints="{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }"
          :loop="upcomingMovies.length > 1"
          :spaceBetween="20"
          :navigation="true"
        >
          <SwiperSlide v-for="up in upcomingMovies" :key="up.id">
            <div class="card">
              <div class="card__header">
                <img :src="`https://image.tmdb.org/t/p/w500/${up.poster_path}`" />
              </div>
              <div class="card__body">
                <h4>{{ up.original_title }}</h4>
                <div class="flex card__details">
                  <div class="card__date">{{ up.release_date }}</div>
                  <div :class="['card__average', up.vote_average >= 7 ? 'green' : 'yellow']">
                    {{ up.vote_average }}
                  </div>
                </div>
                <NuxtLink :to="`movies/${up.id}`" class="button">Read More</NuxtLink>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </client-only>
    </div>
  </section>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { API_BASE_URL, API_KEY } from '~/config/constants'
const upcomingMovies = ref<any[]>([])

const { data } = await useFetch(
  `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
)

if (data.value?.results) {
  upcomingMovies.value = data.value.results
}
</script>

