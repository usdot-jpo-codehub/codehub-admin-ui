<template>
  <div class="ch-add--wrapper-h">
    <div class="ch-add--wrapper-v">
      <h1>New Category</h1>
      <div v-if="processingError || error" :class="processingError || error ? 'ch-add--message-alert':''">
        <span>{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'ch-add--message-action':''">
        <span>{{message}}</span>
      </div>
      <hr>
      <div class="ch-add--input-checkbox">
        <input type="checkbox" v-model="newCategory.isEnabled" name="add-input-enabled" id="id-add-input-enabled">
        <span>Enabled</span>
      </div>
      <div :class="invalidName ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-input-name">Name</label>
        <input type="text" v-model="newCategory.name" name="add-input-name" id="id-add-input-name"  placeholder="Category name...">
      </div>
      <div class="ch-add--input">
        <label for="id-add-input-description">Description</label>
        <textarea v-model="newCategory.description" name="add-input-description" id="id-add-input-description" placeholder="Category description..."></textarea>
      </div>
      <div class="ch-add--controls">
        <button v-on:click="okClicked">Ok</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'CategoriesAdd',
  data: function() {
    return {
      message: '',
      error: false,
      newCategory: {
        name: null,
        isEnabled: false,
        description: null
      },
      invalidName: false
    }
  },
  computed: {
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
        if (this.processingId === 'AddCategory') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/categories'});
    },
    okClicked: function() {
      this.invalidName = !this.newCategory.name || this.newCategory.name ==='';

      this.error = this.invalidName;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else {
        let transacData = {
          data: this.newCategory,
          id: 'AddCategory'
        };
        this.$store.dispatch('addCategory', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(() => {
          this.message ='Done!';
          this.$router.push({path: '/categories'});
        }, 500);
      }
    }
  }
}
</script>