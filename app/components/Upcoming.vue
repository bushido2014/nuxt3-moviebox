<template>
  <section class="top-rated">
    <div class="container">
      <div class="section-title">
        <h2>Upcoming Movies</h2>
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
        <swiper-slide v-for="up in upcoming.results || []">
          <div class="card">
            <div class="card__header">
              <img :src="`https://image.tmdb.org/t/p/w500/${up.poster_path}`" />
            </div>
            <div class="card__body">
              <div class="card__body-title">
                <h4>{{ up.original_title }}</h4>
              </div>
              <div class="flex card__details">
                <div class="card__date">{{ up.release_date }}</div>
                <div
                  :class="[
                    'card__average',
                    up.vote_average >= 7 ? 'green' : 'yellow',
                  ]"
                >
                  {{ up.vote_average }}
                </div>
              </div>

              <NuxtLink :to="`movies/${up.id}`" class="button"
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

import { upComing } from '@/types';

const { data: upcomingMovies } = await useFetch('/api/movies/upcoming');


//console.log(upcoming);
</script>
