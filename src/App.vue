<template>
  <div id="app" class="ch-app-wrapper">
    <CHHeader/>
    <router-view :class="extended ? 'ch-app-router-view  ch-app-router-view--extended' : ' ch-app-router-view'"/>
  </div>
</template>

<script>
import CHHeader from '@/components/ch-header.vue';

export default {
  name: 'app',
  data: function() {
    return {
      extended: true
    }
  },
  components: {
    CHHeader
  },
  created: function() {
    let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
    if(this.$store.state.isMobile != isMobile){
      this.$store.commit('setIsMobile', isMobile);
    }
  },
  watch: {
    $route: function(to) {
      this.extended = to.name === 'home';
    }
  }
}
</script>

<style lang="scss">
@import './sass/main.scss';
</style>
