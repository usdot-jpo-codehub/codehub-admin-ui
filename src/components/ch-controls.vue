<template>
  <div class="ch-controls-wrapper">
    <div class="ch-controls--buttons">
      <button v-on:click="reloadClicked">Reload</button>
      <button v-on:click="addClicked">Add</button>
      <button v-on:click="removeClicked">Remove</button>
      <button v-on:click="updateClicked">Update</button>
      <button v-on:click="resetClicked">Reset Cache</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CHControls",
  methods: {
    reloadClicked: function() {
      this.$store.dispatch('getAll');
    },
    addClicked: function() {
      this.clearActionState();
      this.$router.push({path:"/add"});
    },
    removeClicked: function() {
      this.clearActionState();
      let data = this.getSelectedRepos();
      if(data.length > 0) {
        this.$store.commit('setSelectedRepos', data);
        this.$router.push({path:"/remove"});
      }
    },
    updateClicked: function() {
      this.clearActionState();
      let data = this.getSelectedRepos();
      if(data.length > 0) {
        this.$store.commit('setSelectedRepos', data);
        this.$router.push({path:"/update"});
      }
    },
    resetClicked: function() {
      this.clearActionState();
      let data = this.getSelectedRepos();
      if(data.length > 0) {
        this.$store.commit('setSelectedRepos', data);
        this.$router.push({path:"/reset"});
      }
    },
    getSelectedRepos: function() {
      return this.$store.state.repos.filter( (x) => { return x.selected;});
    },
    clearActionState: function() {
      this.$store.commit('setIsProcessing', false);
      this.$store.commit('setProcessingId', '');
      this.$store.commit('setSelectedRepos', []);
      this.$store.commit('setProcessingError', false);
      this.$store.commit('setProcessingMessage', '');
    }

  }
}
</script>