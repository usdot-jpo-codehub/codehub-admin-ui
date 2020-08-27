<template>
  <div class="ch-category-image-selector__wrapper">
    <span class="ch-category-image-selector__title">Available images</span>
    <div class="ch-category-image-selector__images">
      <div :class="isSelectedImage == item ? 'ch-category-image-selector__image-selected':''" v-for="(item, index) in data" :key="index">
        <CHCategoryImage :data="{image:item,index:index}" :cb="imageSelected" />
      </div>
    </div>
    <div class="ch-category-image-selector__images-controls">
      <button :disabled="!selectedImage" v-on:click="selectClicked">Select</button>
      <button v-on:click="cancelClicked">Cancel</button>
    </div>
  </div>
</template>
<script>
import CHCategoryImage from '@/components/ch-category-image.vue';
export default {
  name: 'CHCategoryImageSelector',
  props: ['title', 'data', 'cb'],
  components: {
    CHCategoryImage
  },
  data: function() {
    return {
      selectedImage: null,
      selectedCategory: {
        imageFileName: null
      }
    }
  },
  computed: {
    isSelectedImage: {
      get: function() {
        return this.selectedImage;
      }
    }
  },
  methods: {
    imageSelected: function(data) {
      this.selectedImage = data.image;
    },
    imagePicked: function() {
      this.selectedCategory.imageFileName = this.selectedImage
      this.showImages = false;
    },
    selectClicked: function() {
      if (this.selectedImage) {
        this.cb('ok', this.selectedImage);
      }
    },
    cancelClicked: function() {
      this.cb('cancel', null);
    }
  }
}
</script>