<template>
  <header class="header" :class="{ sticky_header: active }">
    <div class="container">
      
      <div>
        <NuxtLink class="header-logo" to="/"
          ><img
            src="https://i.postimg.cc/k50Jjkyx/moviebox-logo.png"
            alt="Movie Box"
          />
          <span>MovieBox</span></NuxtLink
        >
      </div>
      <nav>
        <ul>
          <li>
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink class="nav-link" to="/search">Search</NuxtLink>
          </li>
        </ul>
      </nav>
      
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.querySelector('header');
      if (window.scrollY > navBar.offsetTop) {
        this.active = true;
      } else {
        this.active = false;
      }
    };
  },
};
</script>
