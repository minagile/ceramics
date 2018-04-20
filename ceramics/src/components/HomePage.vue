<template>
  <div class="home-page">
    <head-page></head-page>
    <div class="first-page">
      <h2>HOMEPAGRE</h2>
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
export default {
  name: 'homepage',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    HeadPage
  }
}
</script>

<style lang="less" scoped>
.home-page {
  padding-top: 80px;
}
</style>
