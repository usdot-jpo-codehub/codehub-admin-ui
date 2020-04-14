<template>
  <div class="engagementpopup_wrapper">
    <div class="engagementpopup_controls">
      <button v-on:click="invalidatePath()">Invalidate</button>
      <input type="text" v-model="cloudfrontInvalidate" @keyup.enter="invalidatePath()" placeholder="Item path...">
      <span class="cloudfrontinvalidation_message error" v-if="processing_error">{{processing_message}}</span>
      <span class="cloudfrontinvalidation_message" v-if="processing">Processing request...</span>
      <span class="cloudfrontinvalidation_message completed" v-if="completed && !processing && !processing_error">Cloudfront path successfully invalidated.</span>
    </div>
  </div>
</template>
<script>
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'CloudfrontInvalidate',
  mixins: [CHMixin],
  data: function() {
    return {
      cloudfrontInvalidate: "",
      message: ""
    }
  },
  methods: {
    invalidatePath: function() {
      if (!this.cloudfrontInvalidate || this.cloudfrontInvalidate == "") {
        return;
      } else {
        let transacData = {
          data: {"path":this.cloudfrontInvalidate},
          id: 'invalidatePath'
        };
        this.$store.dispatch('invalidateCloudfrontPath', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        setTimeout(() => {
          this.message ='Done!';
        }, 500);
      }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'invalidatePath') {
          this.closeView();
        }
      }
    }
  },
  computed: {
    processing: {
      get: function() {return this.$store.state.is_processing; },
      set: function(val) { this.$store.commit('setIsProcessing', val)}
    },
    processing_message: {
      get: function() {return this.$store.state.processing_message; }
    },
    processing_error: {
      get: function() {return this.$store.state.processing_error; }
    },
    completed: {
      get: function() {return this.$store.state.completed; }
    }
  }
}
</script>
