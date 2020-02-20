<template>
  <div class="ch-reset--wrapper-h">
    <div class="ch-reset--wrapper-v">
      <h1>Reset Repository</h1>
      <div v-if="processingError" :class="processingError ? 'ch-reset--message-alert':''">
        <span>{{processingMessage}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'ch-reset--message-action':''">
        <span>{{message}}</span>
      </div>
      <hr v-if="processing || error || processingError">
      <div class="ch-reset--message">
        <p>The stored cache will be removed for the following repositories.</p>
        <p>Type the word "Reset" in the next box and press the Reset button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'ch-reset--controls ch-reset--controls-alert' : 'ch-reset--controls'">
        <input type="text" v-model="confirmation" name="ch-reset-confirmation" id="id-ch-reset-confirmation" placeholder="Confirmation...">
        <button v-on:click="resetClicked">Reset</button>
        <button v-on:click="cancelClicked">Cancel</button>
        <span class="ch-reset--label">Total: {{selectedRepos.length}}</span>
      </div>
      <div class="ch-reset--repos">
        <ul>
          <li v-for="(item, index) in selectedRepos" :key="index" >
            <CHRepo :data="item" :index="index" :hideControls="true" />
          </li>
        </ul>
      </div>
      

    </div>
  </div>
</template>
<script>
import CHRepo from '@/components/ch-repo.vue';
export default {
  name: 'reset',
  data: function() {
    return {
      confirmation: '',
      invalidConfirmation: false,
      message: '',
      error: false
    }
  },
  components: {
    CHRepo
  },
  computed: {
    selectedRepos: {
      get: function() { return this.$store.state.selected_repos; }
    },
    processing: {
      get: function() {return this.$store.state.is_processing; },
      set: function(val) { this.$store.commit('setIsProcessing', val)}
    },
    processingMessage: {
      get: function() {return this.$store.state.processing_message;},
      set: function(val) {this.$store.state.processing_message = val;}
    },
    processingError: {
      get: function() {return this.$store.state.processing_error; }
    },
    processingId: {
      get: function() {return this.$store.state.processing_id; }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'Reset') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    resetClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Reset';
      if(!this.invalidConfirmation) {
        let transacData = {
          data: [...this.selectedRepos],
          id: 'Reset'
        };
        this.$store.dispatch('resetCacheRepo', transacData);
      }
    },
    cancelClicked: function() {
      this.$router.push({path: '/'});
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$store.dispatch('getAll');
          this.$router.push({path: '/'});
        }, 1500);
      }
    }
  }
}
</script>