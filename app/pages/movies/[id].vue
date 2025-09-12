<template>
  <div>

    <Head>
      <Title> {{ movie.original_title }} | {{ movie.tagline }} </Title>
      <Meta name="description" :content="movie.overview" />
    </Head>

    <Loader v-if="isLoading" />
    <div v-else>
      <div class="details-bg" v-bind:style="{
        'background-image': `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }">

        <div class="container">
          <div class="back-home">
            <NuxtLink class="button" to="/">Back to Home</NuxtLink>
          </div>
          <div class="grid details">
            <div class="details-img">
              <img class="w-full" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
            </div>
            <div class="details-description">
              <h2>{{ movie.original_title }}</h2>
              <p>{{ movie.tagline }}</p>
              <div class="genres-list">
                <span class="genres" v-for="genre in movie.genres">{{
                  genre.name
                }}</span>
              </div>
              <p>Released: {{ movie.release_date }}</p>
              <p>Budget: $ {{ movie.budget }}</p>
              <div>
                <span :class="[
                  'details__average',
                  movie.vote_average >= 7 ? 'green' : 'yellow',
                ]">{{ movie.vote_average }}
                </span>
              </div>
              <div class="details-production">
                <h3>Production</h3>
                <ul :class="{
                  'production-name': true,
                  columns: movie.production_companies.length > 3,
                }">
                  <li v-for="production in movie.production_companies">
                    <span>{{ production.name }}</span>
                  </li>
                </ul>
              </div>
              <div class="details-overview">
                <p>{{ movie.overview }}</p>
              </div>
              <div class="home-link">
                <a :href="movie.homepage" target="_blank">Home Page</a>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div class="actors-wpapper">
        <div class="container">
          <div class="section-title">
            <h2>Top Billed Cast</h2>
          </div>


          <Swiper :modules="[SwiperNavigation]" :breakpoints="{
            640: { slidesPerView: 1 },
            720: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }" :loop="true" :spaceBetween="20" :navigation="true">
            <SwiperSlide v-for="(actor, index) in casts.cast.slice(0, 12)">
              <div class="card cast-card">
                <div class="card__body">
                  <img :src="'https://image.tmdb.org/t/p/w780' + actor.profile_path" :alt="actor.name">
                  <div class="card__body-title">
                    <h4>{{ actor.name }}</h4>
                  </div>

                  <p>{{ actor.character }}</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

        </div>

      </div>


      <div class="recomended-wrapper">
        <div class="container">
          <div class="section-title">
            <h3>Recommendations</h3>
          </div>
          <Swiper :modules="[SwiperScrollbar]" :breakpoints="{
            640: { slidesPerView: 1 },
            720: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }" :loop="false" :spaceBetween="20" :navigation="false" :scrollbar="{ draggable: true }">
            <SwiperSlide v-for="rec in recomendations.results.slice(0, 8)">
              <NuxtLink :to="`${rec.id}`" class="card rec-card">
                <div class="card__body">
                  <img :src="`https://image.tmdb.org/t/p/w300/${rec.backdrop_path}`" />
                  <p> {{ rec.original_title }}</p>
                </div>

              </NuxtLink>
            </SwiperSlide>
            <div class="swiper-scrollbar"></div>
          </Swiper>

        </div>
      </div>






    </div>


  </div>
  
</template>

<script lang="ts" setup>
const route = useRoute();
const isLoading = ref(true);

import { MovieDetalis } from '@/types';

const { data: movie } = await useFetch<MovieDetalis>(`/api/movies/${route.params.id}`)

const { data: casts } = await useFetch(`/api/movies/${route.params.id}/credits`)

const { data: recomendations } = await useFetch(`/api/movies/${route.params.id}/recommendations`)

setTimeout(() => {
  isLoading.value = false;
}, 1800);
//console.log(movie);

useHead({
  bodyAttrs: {
    class: 'movie-details',
  },
});
</script>
<style scoped>
.actors-wpapper {
  padding: 25px 0;
}

.actors-wpapper .section-title {
  position: relative;
}

.cast-card {
  color: initial;
}

.cast-card .card__body-title {
  height: initial;
}

.cast-card p {
  font-size: 15px;
}

.actors-wpapper {
  background-color: #1b2c34;

}
.recomended-wrapper {
  background-color: #f7f7f7;
  color: initial;
  padding: 20px 0;
}

.rec-card {
  overflow: hidden;
  position: relative;
}

.rec-card p,
.rec-card img {
  transition: 0.3s;
}

.rec-card:hover p {
  color: var(--primary-color);
}

.rec-card:hover img {
  filter: grayscale(160%);
}
</style>
