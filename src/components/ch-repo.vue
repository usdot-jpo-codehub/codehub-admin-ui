<template>
  <div class="ch-repo--wrapper" >
    <div class="ch-repo--row">
      <input type="checkbox" name="" id="" v-model="item.selected">
      <CHField label="" :value="item.sourceData.name" size="large" weight="bold" color="green" shadow="true" />
      <CHField label="by:" :value="item.sourceData.owner.name" size="medium" weight="bold" color="navy" shadow="false" />
      
    </div>
    <hr>
    <div class="ch-repo--row ch-repo--row-padding-left">
      <CHField label="enabled:" :value="item.codehubData.isIngestionEnabled" size="medium" weight="normal"/>
      <CHField label="ingested:" :value="item.codehubData.isIngested" size="medium" weight="normal"/>
      <CHField label="visible:" :value="item.codehubData.isVisible" size="medium" weight="normal"/>
      <CHField label="featured:" :value="item.codehubData.badges.isFeatured" size="medium" weight="normal"/>
      <CHField label="status:" :value="item.codehubData.badges.status" size="medium" weight="normal"/>
      
    </div>
    <div class="ch-repo--row ch-repo--row-padding-left">
      <CHField label="source:" :value="item.codehubData.source" size="medium" weight="normal"/>
      <CHField label="url:" :value="item.sourceData.repositoryUrl" size="medium" weight="normal" link="true"/>
    </div>
    <div class="ch-repo--row ch-repo--row-padding-left">
      <CHField label="last modified(utc):" :value="item.codehubData.lastModified" size="medium" weight="normal" time="true"/>
      <CHField label="last ingested(utc):" :value="item.codehubData.lastIngested" size="medium" weight="normal" time="true"/>
      <CHField label="etag:" :value="item.codehubData.etag" size="medium" weight="normal"/>
    </div>
  </div>
</template>
<script>
import CHField from '@/components/ch-field.vue'
export default {
  name: 'CHRepo',
  props: ['data','index'],
  data: function() {
    return {
      item: this.data,
      idx: this.index
    }
  },
  components: {
    CHField
  },
  computed: {
  }
}
</script>