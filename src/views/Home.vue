<template>
  <div class="ch-home--wrapper">
    <div class="ch-home--result">
      <ul :key="refreshKey">
        <li v-for="(item, index) in filterResult" :key="index">
          <CHRepo :data="item" :index="index" />
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import CHRepo from '@/components/ch-repo.vue';
export default {
  name: 'home',
  data: function() {
    return {
      refreshKey: 0
    }
  },
  components: {
    CHRepo
  },
  computed: {
    filterResult: {
      get: function() { 
        if (this.$store.state.filtered_repos.length === 0 && this.$store.state.filter_text === '') {
          this.setRefreshKey();
          return this.$store.state.repos;
        } else {
          this.setRefreshKey();
          return this.$store.state.filtered_repos;
        }
      }
    }
  },
  methods: {
    setRefreshKey: function() {
      this.refreshKey ++;
    }
  }
}
</script>
