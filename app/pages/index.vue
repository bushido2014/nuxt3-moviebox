<template>
  <div class="home-page">
    <Loader v-if="isLoading" />
    <div v-else>
    <HomeSlide />
    <TopRated />
    <Upcoming />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';  
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000) 
})
  
  useHead({
  title: 'Movie Home Page',
  meta: [{ name: 'description', content: 'Movie all' }],
  bodyAttrs: {
    class: 'index-page',
  },
});
</script>

