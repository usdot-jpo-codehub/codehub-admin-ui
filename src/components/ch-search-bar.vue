<template>
  <div class="ch-search-bar--wrapper">
    <div class="ch-search-bar--selectall">
      <input type="checkbox" name="" id="id-ch-selectall" v-model="selected" @change="selectChanged()">
      <label for="id-ch-selectall">select/deselect all</label>
    </div>
    <div class="ch-search-bar--search">
      <input type="search" v-model="filterText" name="" id="id-ch-search-text" placeholder="Filter...">
    </div>
    <div class="ch-search-bar--selectall">
      <span>Total: {{filteredRepos}}</span>
    </div>
    <div class="ch-search-bar--selectall">
      <span>Selected: {{selectedRepos}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CHSeachBar',
  data: function() {
    return {
      selected: false,
      filterTxt: ''
    }
  },
  components: {
  },
  created: function() {
    this.filterTxt = this.$store.state.filter_text;
  },
  computed: {
    filterText: {
      get: function() { return this.filterTxt; },
      set: function(val) { 
          this.filterTxt = val;
          if (val === '') {
            this.$store.commit('setFilteredRepos', []);
          } else if(val[0] === ':') {
            let filteredRepos = this.filterByField(val);
            this.$store.commit('setFilteredRepos', filteredRepos);
          } else {
            let filteredRepos = this.$store.state.repos.filter((item) => {
              let data = item.sourceData.name.toLowerCase().match(val.toLowerCase()) ||
                        item.sourceData.owner.name.toLowerCase().match(val.toLowerCase());
              return data;
            });
            this.$store.commit('setFilteredRepos', filteredRepos);
          }
          this.$store.commit('setFilterText', this.filterTxt);
        }
    },
    filteredRepos: {
      get: function() {
        return this.$store.state.filtered_repos.length == 0 ? this.$store.state.repos.length : this.$store.state.filtered_repos.length; }
    }
    ,
    selectedRepos: {
      get: function() {
        if (this.$store.state.filtered_repos.length == 0) {
          return this.$store.state.repos.filter( (x) => {return x.selected == true; }).length;
        } else {
          return this.$store.state.filtered_repos.filter( (x) => {return x.selected == true; }).length;
        }
      }
    }
  },
  methods: {
    selectChanged: function() {
      if (this.$store.state.filtered_repos.length == 0) {
        this.$store.state.repos.forEach( (x) => {
          x.selected = this.selected;
        });
      } else {
        this.$store.state.filtered_repos.forEach( (x) => {
          x.selected = this.selected;
        });
      }
      
    },
    filterByField: function(val) {
      let parts = val.split(':');
      if(parts.length == 3) {
        let prop = parts[1];
        let v = parts[2];
        if (!v || v == '') {
          return []
        }
        let data = this.$store.state.repos.filter((item) => {
          let result = false;
          let propertyVal = this.getPropertyValue(item, prop);
          if (propertyVal) {
            result = propertyVal.toLowerCase().match(v.toLowerCase());
            console.log('propertyVal',propertyVal,'v',v,'result', result);
          }
          return result;
        });
        return data;
      }
      return [];
    },
    getPropertyValue: function(item, props) {
      let parts = props.split('.');
      let itm = item;
      for(let i=0; i<parts.length; i++){
        itm = itm[parts[i]];
        if (itm == null) {
          return null;
        }
      }
      if (itm == null) {
        return null;
      }
      if (itm && (typeof itm === 'object')) {
        return null;
      }
      return itm+'';
    }
  }
}
</script>