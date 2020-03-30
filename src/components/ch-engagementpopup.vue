<template>
  <div class="ch-engagementpopup__wrapper">
    <div class="ch-engagementpopup_row ch-engagementpopup_space-between">
      <div class="ch-engagementpopup_row">
        <CHField label="Name:" :value="data ? data.name : '[None]'" size="Large" weight="bold" color="green" shadow="true" />
        <CHField label="Is Active:" :value="data ? data.isActive : '[None]'" size="small" weight="normal" :color="data.isActive==true ? 'red' : 'black'" shadow="false" />
      </div>
      <div v-if="!hideControls" class="ch-engagementpopup_row">
        <a v-on:click="actionCallback('update', data.id)">
          <PlaylistEdit title="Update EngagementPopup" :size="18"/>
        </a>
        <a v-on:click="actionCallback('remove', data.id)">
          <TrashCanOutline title="Remove EngagementPopup" :size="18"/>
        </a>
      </div>
    </div>
    <div class="ch-engagementpopup_preview-wrapper">
      <CHField label="Preview" :value="''" size="small" weight="normal" color="black" shadow="false" />
      <div class="ch-engagementpopup_preview-close">
        <span :class="getColorClass+' '+getShadowClass">x</span>
      </div>
      <div v-html="data.content" class="ch-engagementpopup_preview-content"></div>
      <div class="ch-engagementpopup_preview-noshow">
        <input type="checkbox" name="" id="">
        <span :class="getColorClass+' '+getShadowClass">Click here if you would like to stop seeing this message</span>
      </div>
    </div>
    <div class="ch-engagementpopup_data-description">
      <CHField label="Description" :value="''" size="small" weight="normal" color="black" shadow="false" />
      <CHField label="" :value="data ? data.description : '[None]'" size="small" weight="normal" color="black" shadow="false" />
    </div>
    <div class="ch-engagementpopup_row">
      <CHField label="ID:" :value="data ? data.id : '[None]'" size="small" weight="normal" color="gray" shadow="false" />
      <CHField label="Last Modified:" :value="data ? data.lastModified : '[None]'" size="small" weight="normal" color="black" shadow="false" time="true" />
    </div>
    <div class="ch-engagementpopup_row">
      <CHField label="Controls color:" :value="data ? data.controlsColor : '[None]'" size="small" weight="normal" color="black" shadow="false" />
      <CHField label="Controls shadow:" :value="data ? data.controlsShadow : '[None]'" size="small" weight="normal" color="black" shadow="false" />
    </div>
  </div>
</template>
<script>
import CHMixin from '@/mixins/ch-mixin.js';
import CHField from '@/components/ch-field'
import PlaylistEdit from 'vue-material-design-icons/PlaylistEdit'
import TrashCanOutline  from 'vue-material-design-icons/TrashCanOutline'
export default {
  name: 'CHEngagementPopup',
  props: ['data','hideControls','actionCallback'],
  mixins: [CHMixin],
  components: {
    CHField,
    PlaylistEdit,
    TrashCanOutline
  },
  computed: {
    getColorClass: {
      get: function() {
        let val = (!this.data || !this.data.controlsColor) ? 'black' : this.data.controlsColor;
        return this.getEngPopColorClass(val);
      }
    },
    getShadowClass: {
      get: function() {
        let val = (!this.data || !this.data.controlsShadow) ? 'white' : this.data.controlsShadow;
        return this.getEngPopShadowClass(val);
      }
    }
  }
}
</script>
