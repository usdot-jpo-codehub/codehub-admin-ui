<template>
  <div class="categories_wrapper">
    <div class="categories_controls">
      <button v-if="isVisible" v-on:click="listCategories()">Refresh</button>
      <button v-if="isVisible" v-on:click="addCategory()">Add</button>
      <input v-if="isVisible" type="search" name="category-search" id="id-category-search" v-model="categoryFilter" placeholder="Filter categories...">
    </div>
    <router-view name="categories" :key="$route.fullPath" class="categories_router-view"></router-view>
  </div>
</template>
<script>
export default {
  name: 'Categories',
  data: function() {
    return {
      filterTxt: ''
    }
  },
  computed: {
    isSelected: {
      get: function() {return this.$store.state.categories.filter(x => x.selected).length > 0;}
    },
    isVisible: {
      get: function() {  return this.$route.name == 'categories-home'; }
    },
    categoryFilter: {
      get: function() { 
          return this.$store.state.categoryFilter;
        },
      set: function(val) { 
          let v = val ? val : '';
          this.$store.commit('setCategoryFilter', v);
        }
    }
  },
  methods: {
    listCategories: function() {
      this.clearActionState();
      if (this.$route.path == "/categories") {
        this.$store.dispatch('getCategories');
      } else {
        this.$router.push({path:"/categories"});
      }
    },
    addCategory: function() {
      this.clearActionState();
      this.$router.push({path:"/categories/add"});
    },
    clearActionState: function() {
      this.$store.commit('setIsProcessing', false);
      this.$store.commit('setProcessingId', '');
      this.$store.commit('setSelectedRepos', []);
      this.$store.commit('setProcessingError', false);
      this.$store.commit('setProcessingMessage', '');
      this.$store.commit('setSelectedCategory', null);
    }
  }
}
</script>