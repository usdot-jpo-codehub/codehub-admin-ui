<template>
  <div class="ch-engpo__layout-column">
    <div class="ch-engpo__controls-wrapper-h">
      <div class="ch-engpo_controls-wrapper-v">
        <h1>New Engagement PopUp</h1>
        <div v-if="processingError || error" :class="processingError || error ? 'ch-engpo__message-alert':''">
          <span>{{processingMessage + message}}</span>
        </div>
        <div v-if="processing" :class="processing ? 'ch-engpo__message-action':''">
          <span>{{message}}</span>
        </div>
        <hr v-if="processing || error">
        <div class="ch-engpo__message">
          <p>Type the word "Add" in the next input box and press the "Add" button to confirm.</p>
        </div>
        <div :class="invalidConfirmation ? 'ch-engpo__controls cch-engpo__input ch-engpo__input-alert' : 'ch-engpo__controls cch-engpo__input'">
          <input type="text" v-model="confirmation" placeholder="Confirmation...">
          <button v-on:click="addClicked">Add</button>
          <button v-on:click="cancelClicked">Cancel</button>
        </div>
        <hr>
        <div :class="invalidName ? 'ch-engpo__input ch-engpo__input-alert' : 'ch-engpo__input'">
          <label for="id-input-name">Name</label>
          <input type="text" v-model="newEngagementPopup.name" id="id-input-name" placeholder="Name...">
        </div>
        <div class="ch-engpo__input">
          <label for="id-input-description">Description</label>
          <textarea v-model="newEngagementPopup.description" id="id-input-description" placeholder="Description..."></textarea>
        </div>
      </div>
    </div>
    <div :class="invalidContent ? 'ch-engpo__html-editor ch-engpo__input-alert' : 'ch-engpo__html-editor'">
      <label>Source code</label>
      <textarea v-model="newEngagementPopup.content"></textarea>
    </div>

    <div class="ch-engpo__controls-color">
      <label for="id-controls-color">Controls font color:</label>
      <span :style="'background-color:'+newEngagementPopup.controlsColor">W</span>
      <select id="id-controls-color" v-model="newEngagementPopup.controlsColor">
        <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
      </select>
      <label for="id-controls-shadow">Controls font shadow:</label>
      <span :style="'background-color:'+newEngagementPopup.controlsShadow">W</span>
      <select id="id-controls-shadow" v-model="newEngagementPopup.controlsShadow">
        <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
      </select>
    </div>

    <div class="ch-engpo__html-preview-wrapper">
      <label>Preview</label>
      <div class="ch-engpo__preview-close">
        <span :class="getColorClass+' '+getShadowClass">x</span>
      </div>
      <div class="ch-engpo__html-preview" v-html="newEngagementPopup.content"></div>
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
  name: 'EngagementPopupAdd',
  mixins: [CHMixin],
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false,
      invalidContent: false,
      newEngagementPopup: {
        id: null,
        name: '',
        isActive: false,
        description: '',
        lastModified: null,
        content: '',
        controlsColor: 'black',
        controlsShadow: 'white'
      }
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
    },
    getColorClass: {
      get: function() {
        let val = (!this.newEngagementPopup || !this.newEngagementPopup.controlsColor) ? 'black' : this.newEngagementPopup.controlsColor;
        return this.getEngPopColorClass(val);
      }
    },
    getShadowClass: {
      get: function() {
        let val = (!this.newEngagementPopup || !this.newEngagementPopup.controlsShadow) ? 'white' : this.newEngagementPopup.controlsShadow;
        return this.getEngPopShadowClass(val);
      }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'AddEngagementPopup') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/engagementpopup'});
    },
    addClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Add';
      this.invalidName = !this.newEngagementPopup.name || this.newEngagementPopup.name ==='';
      this.invalidContent = !this.newEngagementPopup.content || this.newEngagementPopup.content === '';

      this.error = this.invalidName || this.invalidContent;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.newEngagementPopup,
          id: 'AddEngagementPopup'
        };
        this.$store.dispatch('addEngagementPopups', transacData);
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
