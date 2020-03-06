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
      <div class="ch-add--flex-row">
        <img class="ch-add--img ch-add--popular-image" v-on:click="selectImage" :disabled="!newCategory.isPopular" :src="newCategory.imageFileName ? newCategory.imageFileName : imageOnError" alt="Category image" @error="imageOnError">
        <div class="ch-add--popular-controls">
          <div class="ch-add--flex-row ch-add--flex-start">
            <div class="ch-add--input-checkbox">
              <input type="checkbox" v-model="newCategory.isPopular" @change="isPopularChanged" name="add-input-enabled" id="id-add-input-enabled">
              <span>Popular</span>
            </div>
            <div :class="invalidOrder ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
              <label for="id-add-input-order">Order</label>
              <input :disabled="!newCategory.isPopular" type="text" v-model="newCategory.orderPopular" name="add-input-order" id="id-add-input-order"  placeholder="Category popular order...">
            </div>
          </div>
          <div class="ch-add--flex-row">
            <div class="ch-add--input ch-add--input-disable">
              <label for="id-add-input-image-file-name">Image file name</label>
              <input :disabled="true" type="text" v-model="newCategory.imageFileName" name="add-input-image-file-name" id="id-add-input-image-file-name" placeholder="Category image file name...">
            </div>
          </div>
        </div>
      </div>

      <CHCategoryImageSelector v-if="showImages" :data="categoryImages" title="Available images" :cb="imageSelectorAction" />

      <div v-if="!showImages" class="ch-add--controls">
        <button v-on:click="okClicked">Ok</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import CHCategoryImageSelector from '@/components/ch-category-image-selector.vue';
export default {
  name: 'CategoriesAdd',
  data: function() {
    return {
      message: '',
      error: false,
      newCategory: {
        name: null,
        isEnabled: false,
        description: null,
        isPopular: false,
        orderPopular: null,
        imageFileName: null
      },
      invalidName: false,
      invalidOrder: false,
      showImages: false,
      selectedImage: null,
      availableCategoryImages: []
    }
  },
  components: {
    CHCategoryImageSelector
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
    },
    categoryImages: {
      get: function() {
        return this.$store.state.categoryImages;
      }
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
      this.invalidOrder = this.newCategory.isPopular && (!this.newCategory.orderPopular || this.newCategory.orderPopular === '');

      this.error = this.invalidName || this.invalidOrder;
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
    },
    imageOnError: function(event) {
      event.target.src = "/img/unknown.svg";
    },
    selectImage: function() {
      if (this.newCategory.isPopular) {
        this.$store.dispatch('fetchCategoryImages');
        this.showImages = true;
      }
    },
    isPopularChanged: function() {
      if(!this.newCategory.isPopular) {
        this.showImages = false;
      }
    },
    imageSelectorAction: function(action, data) {
      if (action=='ok' && data) {
        this.newCategory.imageFileName = data;
        this.showImages = false;
      } else {
        this.showImages = false;
      }
    }
  }
}
</script>