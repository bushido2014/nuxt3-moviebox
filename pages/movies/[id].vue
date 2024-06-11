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









    </div>


  </div>
  
</template>

<script lang="ts" setup>
const route = useRoute();
import { MovieDetalis } from '@/types';
import { API_BASE_URL, API_KEY } from '~/config/constants';
const isLoading = ref(true);

const { data: movie }: { data: MovieDetalis } = useFetch<MovieDetalis[]>(
  `${API_BASE_URL}${route.params.id}?api_key=${API_KEY}&language=en-US`
);
const { data: casts } = await useFetch(`${API_BASE_URL}${route.params.id}/credits?api_key=${API_KEY}&language=en-US`);
//console.log(casts);

setTimeout(() => {
  isLoading.value = false;
}, 1800);
console.log(movie);

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
</style>