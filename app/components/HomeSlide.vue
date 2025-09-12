<template>
  <swiper-container
    :modules="[SwiperAutoplay, SwiperEffectFade]"
    :slides-per-view="1"
    :loop="true"
    :speed="2600"
    :spaceBetween="20"
    :effect="'fade'"
    :autoplay="{
      delay: 2600,
      disableOnInteraction: true,
    }"
  >
    <swiper-slide
      v-for="popular in popularMovies.results  || []"
      :key="popular.id"
      class="animeslide-slide"
    >
      <div
        class="bg-slide"
        v-bind:style="{
          'background-image': `url(https://image.tmdb.org/t/p/original/${popular?.backdrop_path})`,
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
                <NuxtLink :to="`movies/${popular.id}`" class="button"
                  >Read More
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts" setup>

import { Popular } from '@/types';

const { data: popularMovies } = await useFetch('/api/movies/popular');


//console.log(popularMovies);
</script>
