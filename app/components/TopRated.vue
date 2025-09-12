<template>
  <section class="top-rated">
    <div class="container">
      <div class="section-title">
        <h2>Top Rated Movies</h2>
      </div>
      <swiper-container
        :modules="[SwiperNavigation]"
        :breakpoints="{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }"
        :loop="true"
        :spaceBetween="20"
        :navigation="true"
      >
        <swiper-slide v-for="top in top_rated.results || []">
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
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>
<script lang="ts" setup>

import { topRated } from '@/types';

const { data: topRatedMovies } = await useFetch('/api/movies/top_rated')


//console.log(top_rated);
</script>
