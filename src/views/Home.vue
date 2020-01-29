<template>
  <div class="ch-home--wrapper">
    <div class="ch-home--result">
      <ul :key="refreshKey">
        <li v-for="(item, index) in filterResult" :key="index">
          <CHRepo :data="item" :index="index" :actionCallback="actionCallBack" />
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import CHRepo from '@/components/ch-repo.vue';
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'home',
  data: function() {
    return {
      refreshKey: 0
    }
  },
  mixins: [CHMixin],
  components: {
    CHRepo
  },
  created: function() {
    this.$store.dispatch('getAll');
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
    },
    categories: {
      get: function() {return this.$store.state.categories;}
    }
  },
  methods: {
    setRefreshKey: function() {
      this.refreshKey ++;
    },
    actionCallBack: function(type, repo) {
      switch(type) {
        case 'update':
          this.updateRepo(repo);
          break;
        case 'remove':
          this.removeRepo(repo);
          break;
      }
    },
    updateRepo: function(repo) {
      this.clearActionState();
      this.$store.commit('setSelectedRepos', [repo]);
      this.$router.push({path:"/update"});
    },
    removeRepo: function(repo) {
      this.clearActionState();
      this.$store.commit('setSelectedRepos', [repo]);
      this.$router.push({path:"/remove"});
    }
  }
}
</script>
