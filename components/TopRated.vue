<template>
  <section class="top-rated">
    <div class="container">
      <div class="section-title">
        <h2>Top Rated Movies</h2>
      </div>
      <Swiper
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
        <SwiperSlide v-for="top in top_rated.results">
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
    </div>
  </section>
</template>
<script lang="ts" setup>
import { API_BASE_URL, API_KEY } from '~/config/constants';
import { topRated } from '@/types';
const { data: top_rated }: { data: topRated } = await useFetch<topRated[]>(
  `${API_BASE_URL}top_rated?api_key=${API_KEY}&language=en-US&page=1`
);
//console.log(top_rated);
</script>
