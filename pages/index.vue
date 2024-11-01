<template>
  <div class="home-page">
    <HomeSlide />
    <TopRated />
    <Upcoming />
  </div>
</template>

<script lang="ts" setup>
  useHead({
  title: 'Movie Home Page',
  meta: [{ name: 'description', content: 'Movie all' }],
  bodyAttrs: {
    class: 'index-page',
  },
});
</script>
