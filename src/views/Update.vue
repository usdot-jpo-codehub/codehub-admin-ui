<template>
  <div class="ch-update--wrapper-h">
    <div class="ch-update--wrapper-v">
      
      <h1>Update Repository</h1>
      <div v-if="processingError" :class="processingError ? 'ch-update--message-alert':''">
        <span>{{processingMessage}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'ch-update--message-action':''">
        <span>{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="ch-update--message">
        <p>Type the word "Update" in the next input box and press the "Update" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'ch-update--controls ch-update--controls-alert' : 'ch-update--controls'">
        <input type="text" v-model="confirmation" name="ch-update-confirmation" id="id-ch-update-confirmation" placeholder="Confirmation...">
        <button v-on:click="updateClicked">Update</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
      <hr>
      <div class="ch-update--input-checkbox">
        <input type="checkbox" v-model="repoData.enabled" name="add-input-enabled" id="id-add-input-enabled">
        <span>Enabled</span>
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-input-name">Name</label>
        <input disabled type="text" v-model="repoData.name" name="add-input-name" id="id-add-input-name">
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-input-owner">Owner</label>
        <input disabled type="text" v-model="repoData.owner" name="add-input-owner" id="id-add-input-owner">
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-input-url">Url</label>
        <input disabled type="text" v-model="repoData.url" name="add-input-url" id="id-add-input-url">
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-select-source">Source</label>
        <select disabled v-model="repoData.source" name="add-select-source" id="id-add-select-source" size="1">
          <option value="github" selected>github</option>
        </select>
      </div>
      <div :class="invalidStatus ? 'ch-update--input ch-update--input-alert' : 'ch-update--input'">
        <label for="id-add-select-status">Status</label>
        <select v-model="repoData.status" name="add-select-status" id="id-add-select-status" size="1">
          <option value="pending" selected>pending</option>
          <option value="read-only" selected>read-only</option>
          <option value="active" selected>active</option>
          <option value="inactive" selected>inactive</option>
        </select>
      </div>
      
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'update',
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false,
      selectedRepo: null,
      repoData: {
        id: null,
        name: null,
        owner: null,
        repo: null,
        url: null,
        source: null,
        status: null,
        enabled: true
      },
      invalidName: false,
      invalidOwner: false,
      invalidRepo: false,
      invalidUrl: false,
      invalidSource: false,
      invalidStatus: false
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
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'Update') {
          this.closeView();
        }
      }
    }
  },
  created: function() {
    if (this.$store.state.selected_repos.length > 0){
      this.selectedRepo = this.$store.state.selected_repos[0];
      this.repoData.id = this.selectedRepo.id;
      this.repoData.name = this.selectedRepo.name;
      this.repoData.owner = this.selectedRepo.owner;
      this.repoData.enabled = this.selectedRepo.enabled;
      this.repoData.repo = this.selectedRepo.owner + '/' + this.selectedRepo.name;
      this.repoData.url = this.selectedRepo.url;
      this.repoData.source = this.selectedRepo.source;
      this.repoData.status = this.selectedRepo.status;
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/'});
    },
    updateClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Update';

      this.invalidName = !this.repoData.name || this.repoData.name ==='';
      this.invalidOwner = !this.repoData.owner || this.repoData.owner ==='';
      this.invalidRepo = !this.repoData.repo || this.repoData.repo ==='';
      this.invalidUrl = !this.repoData.url || this.repoData.url ==='';
      this.invalidSource = !this.repoData.source || this.repoData.source ==='';
      this.invalidStatus = !this.repoData.status || this.repoData.status ==='';

      this.error = this.invalidSource || this.invalidOwner || this.invalidRepo || this.invalidUrl || this.invalidSource || this.invalidStatus;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.repoData,
          id: 'Update'
        };
        this.$store.dispatch('updateRepo', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$store.dispatch('getAll');
          this.$router.push({path: '/'});
        }, 1500);
      }
    }
  }
}
</script>