export default {
  methods: {
    clearActionState: function() {
      this.$store.commit('setIsProcessing', false);
      this.$store.commit('setProcessingId', '');
      this.$store.commit('setSelectedRepos', []);
      this.$store.commit('setProcessingError', false);
      this.$store.commit('setProcessingMessage', '');
      this.$store.commit('setSelectedCategory', null);
      this.$store.commit('setSelectedEngagementPopup', null);
    },
    getColors: function() {
      return [
        {color:'white', value: 'white'},
        {color:'black', value: 'black'},
        {color:'navy', value: 'navy'},
        {color:'gray', value: 'gray'},
        {color:'darkgray', value: 'darkgray'},
        {color:'green', value: 'green'},
        {color:'red', value: 'red'},
        {color:'darkred', value: 'darkred'},
        {color:'blue', value: 'blue'},
        {color:'orange', value: 'orange'},
        {color:'transparent', value: 'transparent'}
      ]
    },
    getEngPopColorClass: function(colorValue) {
      if (!colorValue) {
        return "ch-engpop-color-black";
      }
      switch (colorValue) {
        case 'white': return 'ch-engpop-color-white';
        case 'black': return 'ch-engpop-color-black';
        case 'navy': return 'ch-engpop-color-navy';
        case 'gray': return 'ch-engpop-color-gray';
        case 'darkgray': return 'ch-engpop-color-darkgray';
        case 'green': return 'ch-engpop-color-green';
        case 'red': return 'ch-engpop-color-red';
        case 'darkred': return 'ch-engpop-color-darkred';
        case 'blue': return 'ch-engpop-color-blue';
        case 'orange': return 'ch-engpop-color-orange';
        default: return 'ch-engpop-color-black';
      }
    },
    getEngPopShadowClass: function(colorValue) {
      if (!colorValue) {
        return "ch-engpop-shadow-white";
      }
      switch (colorValue) {
        case 'white': return 'ch-engpop-shadow-white';
        case 'black': return 'ch-engpop-shadow-black';
        case 'navy': return 'ch-engpop-shadow-navy';
        case 'gray': return 'ch-engpop-shadow-gray';
        case 'darkgray': return 'ch-engpop-shadow-darkgray';
        case 'green': return 'ch-engpop-shadow-green';
        case 'red': return 'ch-engpop-shadow-red';
        case 'darkred': return 'ch-engpop-shadow-darkred';
        case 'blue': return 'ch-engpop-shadow-blue';
        case 'orange': return 'ch-engpop-shadow-orange';
        default: return 'ch-engpop-shadow-white';
      }
    }
  }
}