<template>
  <div>
    <Loader v-if="isLoading" />
    <div
      v-else
      class="details-bg"
      v-bind:style="{
        'background-image': `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }"
    >
      <div class="container">
        <div class="back-home">
          <NuxtLink class="button" to="/">Back to Home</NuxtLink>
        </div>
        <div class="grid details">
          <div class="details-img">
            <img
              class="w-full"
              v-if="movie"
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </div>
          <div class="details-description">
            <h2 v-if="movie">{{ movie.original_title }}</h2>
            <div class="genres-list" v-if="movie">
              <span class="genres" v-for="genre in movie.genres">{{
                genre.name
              }}</span>
            </div>
            <p v-if="movie">Released: {{ movie.release_date }}</p>

            <div v-if="movie">
              <span
                :class="[
                  'details__average',
                  movie.vote_average >= 7 ? 'green' : 'yellow',
                ]"
                >{{ movie.vote_average }}
              </span>
            </div>
            <div class="details-production">
              <h3>Production</h3>
              <ul
                :class="{
                  'production-name': true,
                  columns: movie.production_companies.length > 3,
                }"
                v-if="movie"
              >
                <li v-for="production in movie.production_companies">
                  <span>{{ production.name }}</span>
                </li>
              </ul>
            </div>
            <div class="details-overview" v-if="movie">
              <p>{{ movie.overview }}</p>
            </div>
            <div class="home-link">
              <a :href="movie.homepage" target="_blank" v-if="movie"
                >Home Page</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

import { API_BASE_URL, API_KEY } from '~/config/constants';
const isLoading = ref(true);

const { data: movie } = useFetch(
  `${API_BASE_URL}${route.params.id}?api_key=${API_KEY}&language=en-US`
);
setTimeout(() => {
  isLoading.value = false;
}, 1800);
console.log(movie);

useHead({
  title: movie?.title
    ? `${movie?.original_title} - Movie Details`
    : 'Movie Details',

  meta: [{ name: 'description', content: 'Movie description detail' }],
  bodyAttrs: {
    class: 'movie-details',
  },
});
</script>
