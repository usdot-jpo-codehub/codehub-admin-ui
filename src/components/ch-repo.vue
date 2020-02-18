<template>
  <div class="ch-repo--wrapper" >
    <div class="ch-repo--row ch-repo--row-space-between">
      <div class="ch-repo--row">
        <input v-if="!hideControls" type="checkbox" name="" id="" v-model="item.selected">
        <CHField label="" :value="item.sourceData.name" size="large" weight="bold" color="green" shadow="true" />
        <CHField label="by:" :value="item.sourceData.owner.name" size="medium" weight="bold" color="navy" shadow="false" />
      </div>
      <div v-if="!hideControls" class="ch-repo--row">
        <a v-on:click="actionCallback('update', item)">
          <PlaylistEdit title="Update Repository" :size="18"/>
        </a>
        <a v-on:click="actionCallback('remove', item)">
          <TrashCanOutline title="Remove Repository" :size="18"/>
        </a>
      </div>

    </div>
    <hr>
    <div class="ch-repo--row ch-repo--padding-left">
      <CHField label="enabled:" :value="item.codehubData.isIngestionEnabled" size="medium" weight="normal"/>
      <CHField label="ingested:" :value="item.codehubData.isIngested" size="medium" weight="normal"/>
      <CHField label="visible:" :value="item.codehubData.isVisible" size="medium" weight="normal"/>
      <CHField label="featured:" :value="item.codehubData.badges.isFeatured" size="medium" weight="normal"/>
      <CHField label="status:" :value="item.codehubData.badges.status" size="medium" weight="normal"/>
      
    </div>
    <div class="ch-repo--row ch-repo--padding-left">
      <CHField label="source:" :value="item.codehubData.source" size="medium" weight="normal"/>
      <CHField label="url:" :value="item.sourceData.repositoryUrl" size="small" weight="normal" link="true"/>
    </div>
    <div class="ch-repo--row ch-repo--padding-left">
      <CHField label="last modified(utc):" :value="item.codehubData.lastModified" size="medium" weight="normal" time="true"/>
      <CHField label="last ingested(utc):" :value="item.codehubData.lastIngested" size="medium" weight="normal" time="true"/>
    </div>
    <div class="ch-repo--row ch-repo--padding-left">
      <CHField label="etag:" :value="item.codehubData.etag" size="medium" weight="normal"/>
      <CHField label="id:" :value="item.id" size="small" weight="normal" color="gray" shadow="false" />
    </div>
    <div class="ch-repo--row ch-repo--padding-left">
      <div class="ch-repo--column">
        <CHField label="Categories" :value="''" size="medium" weight="normal"/>
        <template v-if="item.codehubData.categories.length>0">
          <CHField  v-for="(cat, index) in item.codehubData.categories" :key="index" label="-" :value="cat.name" size="medium" weight="normal"/>
        </template>
        <template v-if="item.codehubData.categories.length <= 0">
          <CHField label="" :value="'[None]'" size="small" weight="normal" color="lighgray"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import CHField from '@/components/ch-field.vue';
import PlaylistEdit from 'vue-material-design-icons/PlaylistEdit';
import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline';
export default {
  name: 'CHRepo',
  props: ['data','index','hideControls', 'actionCallback'],
  data: function() {
    return {
      item: this.data,
      idx: this.index
    }
  },
  components: {
    CHField,
    PlaylistEdit,
    TrashCanOutline
  },
  computed: {
  }
}
</script>