<template>
  <div class="ch-engpo__layout-column">
    <div class="ch-engpo__controls-wrapper-h">
      <div class="ch-engpo_controls-wrapper-v">
        <h1>Update Engagement PopUp</h1>
        <div v-if="processingError || error" :class="processingError || error ? 'ch-engpo__message-alert':''">
          <span>{{processingMessage + message}}</span>
        </div>
        <div v-if="processing" :class="processing ? 'ch-engpo__message-action':''">
          <span>{{message}}</span>
        </div>
        <hr v-if="processing || error">
        <div class="ch-engpo__message">
          <p>Type the word "Update" in the next input box and press the "Update" button to confirm.</p>
        </div>
        <div :class="invalidConfirmation ? 'ch-engpo__controls cch-engpo__input ch-engpo__input-alert' : 'ch-engpo__controls cch-engpo__input'">
          <input type="text" v-model="confirmation" placeholder="Confirmation...">
          <button v-on:click="updateClicked">Update</button>
          <button v-on:click="cancelClicked">Cancel</button>
        </div>
        <hr>
        <div class="ch-engpo__input-checkbox">
          <input type="checkbox" v-model="selectedEngagementPopup.isActive" >
          <span>Is Active</span>
          <span>ID: {{selectedEngagementPopup.id}}</span>
        </div>
        <div :class="invalidName ? 'ch-engpo__input ch-engpo__input-alert' : 'ch-engpo__input'">
          <label for="id-input-name">Name</label>
          <input type="text" v-model="selectedEngagementPopup.name" id="id-input-name" placeholder="Name...">
        </div>
        <div class="ch-engpo__input">
          <label for="id-input-description">Description</label>
          <textarea v-model="selectedEngagementPopup.description" id="id-input-description" placeholder="Description..."></textarea>
        </div>
      </div>
    </div>
    <div class="ch-engpo__html-editor">
      <label>Source code</label>
      <textarea v-model="selectedEngagementPopup.content"></textarea>
    </div>

    <div class="ch-engpo__controls-color">
      <label for="id-controls-color">Controls font color:</label>
      <span :style="'background-color:'+selectedEngagementPopup.controlsColor">W</span>
      <select id="id-controls-color" v-model="selectedEngagementPopup.controlsColor">
        <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
      </select>
      <label for="id-controls-shadow">Controls font shadow:</label>
      <span :style="'background-color:'+selectedEngagementPopup.controlsShadow">W</span>
      <select id="id-controls-shadow" v-model="selectedEngagementPopup.controlsShadow">
        <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
      </select>
    </div>

    <div class="ch-engpo__html-preview-wrapper">
      <label>Preview</label>
      <div class="ch-engpo__preview-close">
        <span :class="getColorClass+' '+getShadowClass">x</span>
      </div>
      <div class="ch-engpo__html-preview" v-html="selectedEngagementPopup.content"></div>
      <div class="ch-engpo__preview-noshow">
        <input type="checkbox" name="" id="">
        <span :class="getColorClass+' '+getShadowClass">Click here if you would like to stop seeing this message</span>
      </div>
    </div>


  </div>
</template>

<script>
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'EngagementPopupUpdate',
  mixins: [CHMixin],
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false,
      selectedEngagementPopup: null,
      selectedControlsColor: 'black',
      selectedControlsShadow: 'white'
    }
  },
  created: function() {
    this.selectedEngagementPopup = this.$store.state.selectedEngagementPopup;
  },
  computed: {
    getColorClass: {
      get: function() {
        let val = (!this.selectedEngagementPopup || !this.selectedEngagementPopup.controlsColor) ? 'black' : this.selectedEngagementPopup.controlsColor;
        return this.getEngPopColorClass(val);
      }
    },
    getShadowClass: {
      get: function() {
        let val = (!this.selectedEngagementPopup || !this.selectedEngagementPopup.controlsShadow) ? 'white' : this.selectedEngagementPopup.controlsShadow;
        return this.getEngPopShadowClass(val);
      }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'UpdateEngagementPopup') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/engagementpopup'});
    },
    updateClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Update';
      this.invalidName = !this.selectedEngagementPopup.name || this.selectedEngagementPopup.name ==='';

      this.error = this.invalidName;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.selectedEngagementPopup,
          id: 'UpdateEngagementPopup'
        };
        this.$store.dispatch('updateEngagementPopups', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(() => {
          this.message ='Done!';
          this.$router.push({path: '/engagementpopup'});
        }, 500);
      }
    }
  }
}
</script>
