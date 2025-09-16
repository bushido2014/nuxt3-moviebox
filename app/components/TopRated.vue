<template>
  <section class="top-rated">
    <div class="container">
      <div class="section-title">
        <h2>Top Rated Movies</h2>
      </div>
      <client-only>
        <Swiper
          :modules="[Navigation]"
          :breakpoints="{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }"
          :loop="topRatedMovies.length > 1"
          :spaceBetween="20"
          :navigation="true"
        >
          <SwiperSlide v-for="top in topRatedMovies" :key="top.id">
            <div class="card">
              <div class="card__header">
                <img
                  :src="`https://image.tmdb.org/t/p/w500/${top.poster_path}`"
                />
              </div>
              <div class="card__body">
                <div class="card__body-title">
                  <h4>{{ top.original_title }}</h4>
                </div>
                <div class="flex card__details">
                  <div class="card__date">{{ top.release_date }}</div>
                  <div
                    :class="[
                      'card__average',
                      top.vote_average >= 7 ? 'green' : 'yellow',
                    ]"
                  >
                    {{ top.vote_average }}
                  </div>
                </div>
                <NuxtLink :to="`movies/${top.id}`" class="button"
                  >Read More
                </NuxtLink>
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

const topRatedMovies = ref<any[]>([])

const { data } = await useFetch('/api/movies/top_rated')

if (data.value?.results) {
  topRatedMovies.value = data.value.results
}
</script>

