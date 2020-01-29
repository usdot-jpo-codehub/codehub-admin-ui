export default {
  methods: {
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