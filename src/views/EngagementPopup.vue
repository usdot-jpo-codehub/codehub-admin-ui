<template>
  <div class="engagementpopup_wrapper">
    <div class="engagementpopup_controls">
      <button v-if="isVisible" v-on:click="listEngagementPopups()">Refresh</button>
      <button v-if="isVisible" v-on:click="addEngagementPopup()">Add</button>
      <input v-if="isVisible" type="search" name="engagementpopup-search" id="id-engagementpopup-search" v-model="engagementPopupFilter" placeholder="Filter...">
    </div>
    <router-view name="engagementpopup" :key="$route.fullPath" class="engagementpopup_router-view"></router-view>
  </div>
</template>
<script>
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'EngagementPopup',
  mixins: [CHMixin],
  data: function() {
    return {
      selectedEngagementPopup: ""
    }
  },
  computed: {
    isVisible: {
      get: function() {  return this.$route.name == 'engagementpopup-home'; }
    },
    engagementPopupFilter: {
      get: function() {
          return this.$store.state.engagementPopupFilter;
        },
      set: function(val) {
          let v = val ? val : '';
          this.$store.commit('setEngagementPopupFilter', v);
        }
    }
  },
  methods: {
    listEngagementPopups: function() {
      this.clearActionState();
      if (this.$route.path == "/engagementpopup") {
        this.$store.dispatch('getEngagementPopups');
      } else {
        this.$router.push({path:"/engagementpopup"});
      }
    },
    addEngagementPopup: function() {
      this.clearActionState();
      this.$router.push({path:"/engagementpopup/add"});
    },
  }
}
</script>
