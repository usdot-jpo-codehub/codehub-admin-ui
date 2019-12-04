<template>
  <div class="ch-add--wrapper-h">
    <div class="ch-add--wrapper-v">
      <h1>New Repository</h1>
      <div v-if="processingError || error" :class="processingError || error ? 'ch-add--message-alert':''">
        <span>{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'ch-add--message-action':''">
        <span>{{message}}</span>
      </div>
      <hr>
      <div class="ch-add--input-checkbox">
        <input type="checkbox" v-model="newRepo.enabled" name="add-input-enabled" id="id-add-input-enabled">
        <span>Enabled</span>
      </div>
      <div :class="invalidUrl ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-input-url">Url</label>
        <input type="text" v-model="newRepo.url" @change="urlChanged()" name="add-input-url" id="id-add-input-url">
      </div>
      <div :class="invalidSource ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-select-source">Source</label>
        <select v-model="newRepo.source" name="add-select-source" id="id-add-select-source" size="1">
          <option v-for="(source, index) in sources" :key="index" :value="source.value">{{source.name}}</option>
        </select>
      </div>
      <div :class="invalidStatus ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-select-status">Status</label>
        <select v-model="newRepo.status" name="add-select-status" id="id-add-select-status" size="1">
          <option v-for="(status, index) in statuses" :key="index" :value="status.value">{{status.name}}</option>
        </select>
      </div>
      <div class="ch-add--input ch-add--input-disable">
        <label for="id-add-input-name">Name</label>
        <input disabled type="text" v-model="newRepo.name" name="add-input-name" id="id-add-input-name" placeholder="Computed from URL...">
      </div>
      <div class="ch-add--input ch-add--input-disable">
        <label for="id-add-input-owner">Owner</label>
        <input disabled type="text" v-model="newRepo.owner" name="add-input-owner" id="id-add-input-owner" placeholder="Computed from URL...">
      </div>
      <div class="ch-add--controls">
        <button v-on:click="okClicked">Ok</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
    </div>
    
  </div>
</template>
<script>
import Utils from '../utils/utils';

export default {
  name: 'add',
  data: function() {
    return {
      message: '',
      error: false,
      newRepo: {
        name: null,
        owner: null,
        url: null,
        source: null,
        status: 'pending',
        enabled: true
      },
      invalidName: false,
      invalidOwner: false,
      invalidUrl: false,
      invalidSource: false,
      invalidStatus: false
    }
  },
  created: function() {
    
  },
  computed: {
    statuses: {
      get: function() {return Utils.getStatusList();}
    },
    sources: {
      get: function() {return Utils.getSourceList();}
    },
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
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'Add') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/'});
    },
    okClicked: function() {
      this.invalidName = !this.newRepo.name || this.newRepo.name ==='';
      this.invalidOwner = !this.newRepo.owner || this.newRepo.owner ==='';
      this.invalidUrl = !this.newRepo.url || this.newRepo.url ==='';
      this.invalidSource = !this.newRepo.source || this.newRepo.source ==='';
      this.invalidStatus = !this.newRepo.status || this.newRepo.status ==='';

      this.error = this.invalidSource || this.invalidOwner || this.invalidUrl || this.invalidSource || this.invalidStatus;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else {
        let transacData = {
          data: this.newRepo,
          id: 'Add'
        };
        this.$store.dispatch('addRepo', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(() => {
          this.message ='Done!';
          this.$store.dispatch('getAll');
          this.$router.push({path: '/'});
        }, 1500);
      }
    },
    urlChanged: function() {

      let urlRegex = 'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
      let regex = new RegExp(urlRegex);
      let parts = this.newRepo.url.split('/');
      if (!this.newRepo.url.match(regex) || parts.length<5) {
        this.invalidUrl = true;
        this.newRepo.name = null;
        this.newRepo.owner = null;
        return;
      }

      this.invalidUrl = false;
      this.newRepo.name = parts[parts.length-1];
      this.newRepo.owner = parts[parts.length-2];

      let sourceList = Utils.getSourceList();
      for(let i=0; i<sourceList.length; i++) {
        let source = sourceList[i];
        if (this.newRepo.url.indexOf(source.value) >= 0) {
          this.newRepo.source = source.value;
          break;
        }
      }
    }
  }
}
</script>