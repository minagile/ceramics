<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
}
.swiper-pagination-bullet {
  border: 2px solid #333;
  opacity: 1;
  background: rgba(0, 0, 0, 0);
}
.swiper-pagination-bullet-active {
  background:  #333;
}
</style>
