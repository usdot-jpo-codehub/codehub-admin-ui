<template>
  <div class="categories-home__wrapper">
    <CHCategory v-for="(item, index) in categories" :key="index" :data="item" :actionCallback="actionCallback"/>
  </div>
</template>
<script>
import CHCategory from '@/components/ch-category.vue';
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'CategoriesHome',
  mixins: [CHMixin],
  components: {
    CHCategory
  },
  created: function() {
    this.$store.dispatch('getCategories');
  },
  computed: {
    categories: {
      get: function() {
        let flt = this.$store.state.categoryFilter;
        let data = this.$store.state.categories.filter((item) => {return  item.name.toLowerCase().match(flt.toLowerCase())});
        return data;
      }
    }
  },
  methods: {
    actionCallback: function(type,id){
      let data = this.$store.state.categories.filter(x => x.id == id);
      if (data.length == 0) {
        return;
      }
      this.clearActionState();
      this.$store.commit('setSelectedCategory', data[0]);

      switch(type.toLowerCase()) {
        case 'update':
          this.$router.push({path:"/categories/update"});
          break;
        case 'remove':
          this.$router.push({path:"/categories/remove"});
          break;
      }
    }
  }
}
</script>