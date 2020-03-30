<template>
  <div class="engagementpopup-home__wrapper">
    <CHEngagementPopup v-for="(item, index) in engagementPopups" :key="index" :data="item" :actionCallback="actionCallback" :hideControls="false" />
  </div>
</template>
<script>
import CHMixin from '@/mixins/ch-mixin.js';
import CHEngagementPopup from '@/components/ch-engagementpopup'
export default {
  name: 'EngagementPopupHome',
  mixins: [CHMixin],
  components: {
    CHEngagementPopup
  },
  created: function() {
    this.$store.dispatch('getEngagementPopups');
  },
  computed: {
    engagementPopups: {
      get : function() {
        let flt = this.$store.state.engagementPopupFilter;
        let data = this.$store.state.engagementPopups.filter((item) => {return  item.name.toLowerCase().match(flt.toLowerCase())});
        return data;
      }
    }
  },
  methods: {
    actionCallback: function(action, id) {
      let fil = this.$store.state.engagementPopups.filter(x => x.id == id);
      if (fil.length == 0) {
        return;
      }
      this.clearActionState();
      this.$store.commit('setSelectedEngagementPopup', fil[0]);
      switch(action.toLowerCase()) {
        case 'update':
          this.$router.push({path:"/engagementpopup/update"});
          break;
        case 'remove':
          this.$router.push({path:"/engagementpopup/remove"});
          break;
      }
    }
  }
}
</script>