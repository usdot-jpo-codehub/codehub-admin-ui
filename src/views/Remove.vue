<template>
  <div class="ch-remove--wrapper-h">
    <div class="ch-remove--wrapper-v">
      <h1>Remove Repository</h1>
      <div v-if="processingError" :class="processingError ? 'ch-remove--message-alert':''">
        <span>{{processingMessage}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'ch-remove--message-action':''">
        <span>{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="ch-remove--message">
        <p>The following repositories are going to be removed from CodeHub.</p>
        <p>Type the word "Delete" in the next input box and press the "Remove" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'ch-remove--controls ch-remove--controls-alert' : 'ch-remove--controls'">
        <input type="text" v-model="confirmation" name="ch-remove-confirmation" id="id-ch-remove-confirmation" placeholder="Confirmation...">
        <button v-on:click="removeClicked">Remove</button>
        <button v-on:click="cancelClicked">Cancel</button>
        <span class="ch-remove--label">Total: {{selectedRepos.length}}</span>
      </div>
      <div class="ch-remove--repos">
        <ul>
          <li v-for="(item, index) in selectedRepos" :key="index" >
            <CHRepo :data="item" :index="index" />
          </li>
        </ul>
      </div>
      

    </div>
  </div>
</template>
<script>
import CHRepo from '@/components/ch-repo.vue';
export default {
  name: 'remove',
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false
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
        if (this.processingId === 'Delete') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    removeClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Delete';
      if(!this.invalidConfirmation) {

        let transacData = {
          data: [...this.selectedRepos],
          id: 'Delete'
        };
        this.$store.dispatch('deleteRepo', transacData);
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