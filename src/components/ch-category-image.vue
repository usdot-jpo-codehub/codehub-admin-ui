<template>
  <div class="ch-category-image_wrapper">
      <a v-on:click="imageClicked">
        <img :src="data.image" :alt="imageName" :title="imageName">
      </a>
  </div>
</template>
<script>
export default {
  name: 'CHCategoryImage',
  props: ['data', 'cb'],
  computed: {
    imageName: {
      get: function() {
        let parts = this.data.image.split('/');
        return parts[parts.length-1];
      }
    }
  },
  methods: {
    imageClicked: function() {
      this.cb(this.data);
    }
  }

}
</script>
