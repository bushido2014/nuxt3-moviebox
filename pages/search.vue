<template>
  <section class="search">
    <div class="search-input-wrapp flex">
      <div class="container">
        <form class="flex" @submit.prevent>
          <input
            v-model="state.query"
            type="text"
            autocorrect="off"
            placeholder="Search for a movie"
          />

          <button @click="search" class="button search-button">Search</button>
        </form>
      </div>
    </div>
    <div class="container">
      <div class="search-movie-wrapp grid">
        <div v-for="movie in state.movies" :key="movie.id" class="search-card">
          <div class="search-card__header">
            <img
              :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`"
              v-if="movie.poster_path"
            />
            <img src="https://picsum.photos/342/513" v-else />
          </div>
          <div class="search-card__body">
            <h3>{{ movie.title }}</h3>
            <NuxtLink :to="`movies/${movie.id}`" class="button"
              >Read More
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { API_KEY } from '~/config/constants';

const state = ref({
  query: '',
  movies: [],
});

const search = async () => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${state.value.query}`;
  const response = await fetch(url);
  const { results } = await response.json();
  state.value.movies = results;
};

export default {
  setup() {
    useHead({
      title: 'Movie Search Page',
      bodyAttrs: {
        class: 'search-page',
      },
    });

    return {
      state,
      search,
    };
  },
};
</script>

<style scoped>
.search {
  padding: 80px 0;
}
</style>
