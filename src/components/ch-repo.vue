<template>
  <div class="ch-repo--wrapper" >
    <div class="ch-repo--row">
      <input type="checkbox" name="" id="" v-model="item.selected">
      <CHField label="" :value="item.name" size="large" weight="bold" color="green" shadow="true" />
      <CHField label="by:" :value="item.owner" size="medium" weight="bold" color="navy" shadow="false" />
      
    </div>
    <hr>
    <div class="ch-repo--row ch-repo--row-padding-left">
      <CHField label="enabled:" :value="item.enabled" size="medium" weight="normal"/>
      <CHField label="status:" :value="item.status" size="medium" weight="normal"/>
      
    </div>
    <div class="ch-repo--row ch-repo--row-padding-left">
      <CHField label="source:" :value="item.source" size="medium" weight="normal"/>
      <CHField label="url:" :value="item.url" size="medium" weight="normal" link="true"/>
    </div>
    <div class="ch-repo--row ch-repo--row-padding-left">
      <CHField label="last modified(utc):" :value="item.last_modified" size="medium" weight="normal" time="true"/>
      <CHField label="last ingested(utc):" :value="item.last_ingested" size="medium" weight="normal" time="true"/>
      <CHField label="etag:" :value="item.etag" size="medium" weight="normal"/>
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