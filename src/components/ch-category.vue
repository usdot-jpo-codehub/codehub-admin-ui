<template>
  <div class="ch-category__wrapper">
    <div class="ch-category__row-title">
      <div class="ch-category__row-subtitle">
        <img v-if="data.isPopular" :src="data.imageFileName" alt="Category Image">
        <CHField label="" :value="data.name" size="medium" weight="bold" color="green" shadow="true" />
      </div>
      <div v-if="!hideControls" class="ch-category__row-subtitle">
        <a v-on:click="actionCallback('update', data.id)">
          <PlaylistEdit title="Update Category" :size="18"/>
        </a>
        <a v-on:click="actionCallback('remove', data.id)">
          <TrashCanOutline title="Remove Category" :size="18"/>
        </a>
      </div>
    </div>
    <hr>
    <div class="ch-category__row">
      <CHField label="Description" :value="''" size="small" weight="normal" color="black" shadow="false" />
    </div>
    <div class="ch-category__row">
      <CHField label="" :value="data.description" size="small" weight="normal" color="black" shadow="false" />
    </div>
    <div class="ch-category__row">
      <CHField label="Enabled" :value="data.isEnabled?'true':'false'" size="small" weight="normal" color="black" shadow="false" />
      <CHField label="Last Modified" :value="data.lastModified" size="small" weight="normal" color="black" shadow="false" time="true" />
    </div>
    <div class="ch-category__row">
      <CHField label="Popular:" :value="data.isPopular?'true':'false'" size="small" weight="normal" color="black" shadow="false" />
      <CHField label="Order:" :value="data.orderPopular ? data.orderPopular : '[None]'" size="small" weight="normal" color="black" shadow="false" />
    </div>
    <div class="ch-category__row">
      <CHField label="Image:" :value="data.imageFileName ? data.imageFileName : '[None]'" size="small" weight="normal" color="black" shadow="false" />
    </div>
    <div class="ch-category__row">
      <CHField label="id:" :value="data.id" size="smaller" weight="normal" color="gray" shadow="false" />
    </div>
  </div>
</template>
<script>
import CHField from '@/components/ch-field.vue'
import PlaylistEdit from 'vue-material-design-icons/PlaylistEdit'
import TrashCanOutline  from 'vue-material-design-icons/TrashCanOutline'
export default {
  name: 'CHCategory',
  props: ['data','hideControls','actionCallback'],
  components: {
    CHField,
    PlaylistEdit,
    TrashCanOutline
  }
}
</script>