<template>
  <div class="ch-remove--wrapper-h">
    <div class="ch-remove--wrapper-v">
      <h1>Remove Category</h1>
      <div v-if="processingError" :class="processingError ? 'ch-remove--message-alert':''">
        <span>{{processingMessage}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'ch-remove--message-action':''">
        <span>{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="ch-remove--message">
        <p>The following Engagement PopUp is going to be removed.</p>
        <p>Type the word "Delete" in the next input box and press the "Remove" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'ch-remove--controls ch-remove--controls-alert' : 'ch-remove--controls'">
        <input type="text" v-model="confirmation" name="ch-remove-confirmation" id="id-ch-remove-confirmation" placeholder="Confirmation...">
        <button v-on:click="removeClicked">Remove</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
      <div class="ch-remove--repos">
         <CHEngagementPopup v-if="selectedEngagementPopup" :data="selectedEngagementPopup" :hideControls="true" />
      </div>
    </div>
  </div>
</template>
<script>
import CHEngagementPopup from '@/components/ch-engagementpopup'
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'EngagementPopupRemove',
  mixins: [CHMixin],
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false
    }
  },
  components: {
    CHEngagementPopup
  },
  computed: {
    selectedEngagementPopup: {
      get: function() { return this.$store.state.selectedEngagementPopup; }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'RemoveEngagementPopup') {
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
          data: this.selectedEngagementPopup,
          id: 'RemoveEngagementPopup'
        };

        this.$store.dispatch('removeEngagementPopups', transacData);
      }
    },
    cancelClicked: function() {
      this.$router.push({path: '/engagementpopup'});
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$router.push({path: '/engagementpopup'});
        }, 500);
      }
    }
  }
}
</script>