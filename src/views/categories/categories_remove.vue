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
        <p>The following category is going to be removed from CodeHub and the Repositories.</p>
        <p>Type the word "Delete" in the next input box and press the "Remove" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'ch-remove--controls ch-remove--controls-alert' : 'ch-remove--controls'">
        <input type="text" v-model="confirmation" name="ch-remove-confirmation" id="id-ch-remove-confirmation" placeholder="Confirmation...">
        <button v-on:click="removeClicked">Remove</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
      <div class="ch-remove--repos">
         <CHCategory v-if="selectedCategory" :data="selectedCategory" :hideControls="true" />
      </div>
    </div>
  </div>
</template>
<script>
import CHCategory from '@/components/ch-category.vue';
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'CategoriesRemove',
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
    CHCategory
  },
  computed: {
    selectedCategory: {
      get: function() { return this.$store.state.selected_category; }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'RemoveCategory') {
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
          data: this.selectedCategory,
          id: 'RemoveCategory'
        };
        this.$store.dispatch('removeCategory', transacData);
      }
    },
    cancelClicked: function() {
      this.$router.push({path: '/categories'});
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$router.push({path: '/categories'});
        }, 500);
      }
    }
  }
}
</script>