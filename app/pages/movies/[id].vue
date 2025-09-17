<template>
  <div>
    <Head v-if="movie">
      <Title>{{ movie.original_title }} | {{ movie.tagline }}</Title>
      <Meta name="description" :content="movie.overview" />
    </Head>

    <Loader v-if="isLoading" />
    <div v-else-if="movie">
      <div class="details-bg"
        :style="{
          'background-image': movie?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
            : 'none'
        }"
      >
        <div class="container">
          <div class="back-home">
            <NuxtLink class="button" to="/">Back to Home</NuxtLink>
          </div>
          <div class="grid details">
            <div class="details-img">
              <img
                v-if="movie.poster_path"
                class="w-full"
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                alt="poster"
              />
              <img v-else src="https://via.placeholder.com/500x750" alt="no poster"/>
            </div>
            <div class="details-description">
              <h2>{{ movie.original_title }}</h2>
              <p v-if="movie.tagline">{{ movie.tagline }}</p>
              <div class="genres-list" v-if="movie.genres?.length">
                <span
                  class="genres"
                  v-for="genre in movie.genres"
                  :key="genre.id"
                >
                  {{ genre.name }}
                </span>
              </div>
              <p v-if="movie.release_date">Released: {{ movie.release_date }}</p>
              <p v-if="movie.budget">Budget: $ {{ movie.budget }}</p>
              <div>
                <span
                  :class="[
                    'details__average',
                    movie.vote_average >= 7 ? 'green' : 'yellow'
                  ]"
                >
                  {{ movie.vote_average }}
                </span>
              </div>

              <div class="details-production" v-if="movie.production_companies?.length">
                <h3>Production</h3>
                <ul
                  :class="{
                    'production-name': true,
                    columns: movie.production_companies.length > 3
                  }"
                >
                  <li
                    v-for="production in movie.production_companies"
                    :key="production.id"
                  >
                    <span>{{ production.name }}</span>
                  </li>
                </ul>
              </div>

              <div class="details-overview" v-if="movie.overview">
                <p>{{ movie.overview }}</p>
              </div>

              <div class="home-link" v-if="movie.homepage">
                <a :href="movie.homepage" target="_blank">Home Page</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cast -->
      <div class="actors-wpapper" v-if="casts?.cast?.length">
        <div class="container">
          <div class="section-title">
            <h2>Top Billed Cast</h2>
          </div>
          <client-only>
            <Swiper
              :modules="[Navigation]"
              :breakpoints="{
                640: { slidesPerView: 1 },
                720: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
              }"
              :loop="true"
              :spaceBetween="20"
              :navigation="true"
            >
              <SwiperSlide
                v-for="(actor, index) in casts.cast.slice(0, 12)"
                :key="actor.id || index"
              >
                <div class="card cast-card">
                  <div class="card__body">
                    <img
                      v-if="actor.profile_path"
                      :src="'https://image.tmdb.org/t/p/w780' + actor.profile_path"
                      :alt="actor.name"
                    />
                    <div class="card__body-title">
                      <h4>{{ actor.name }}</h4>
                    </div>
                    <p>{{ actor.character }}</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </client-only>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="recomended-wrapper" v-if="recomendations?.results?.length">
        <div class="container">
          <div class="section-title">
            <h3>Recommendations</h3>
          </div>
          <client-only>
            <Swiper
              :modules="[Scrollbar]"
              :breakpoints="{
                640: { slidesPerView: 1 },
                720: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
              }"
              :loop="false"
              :spaceBetween="20"
              :navigation="false"
              :scrollbar="{ draggable: true }"
            >
              <SwiperSlide
                v-for="rec in recomendations.results.slice(0, 8)"
                :key="rec.id"
              >
                <NuxtLink :to="`/movies/${rec.id}`" class="card rec-card">
                  <div class="card__body">
                    <img
                      v-if="rec.backdrop_path"
                      :src="`https://image.tmdb.org/t/p/w300/${rec.backdrop_path}`"
                      alt="Recommendation poster"
                    />
                    <p>{{ rec.original_title }}</p>
                  </div>
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-scrollbar"></div>
            </Swiper>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>

const route = useRoute();
const isLoading = ref(true);
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation,  Scrollbar } from 'swiper/modules';
import type { MovieDetalis } from '@/types/index';

import { API_BASE_URL, API_KEY } from '~/config/constants'

const { data: movie } = await useFetch<MovieDetalis>(
  `${API_BASE_URL}${route.params.id}?api_key=${API_KEY}&language=en-US`
);

const { data: casts } = await useFetch(
  `${API_BASE_URL}${route.params.id}/credits?api_key=${API_KEY}&language=en-US`
);

const { data: recomendations } = await useFetch(
  `${API_BASE_URL}${route.params.id}/recommendations?api_key=${API_KEY}&language=en-US`
);

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



