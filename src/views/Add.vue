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
        <input type="checkbox" v-model="newRepo.codehubData.isIngestionEnabled" name="add-input-enabled" id="id-add-input-enabled">
        <span>Enabled</span>
        <input type="checkbox" v-model="newRepo.codehubData.isVisible" name="add-input-enabled" id="id-add-input-enabled">
        <span>Visible</span>
        <input type="checkbox" v-model="newRepo.codehubData.badges.isFeatured" name="add-input-featured" id="id-add-input-featured">
        <span>Featured</span>
      </div>
      <div :class="invalidUrl ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-input-url">Url</label>
        <input type="text" v-model="newRepo.sourceData.repositoryUrl" @change="urlChanged()" name="add-input-url" id="id-add-input-url">
      </div>
      <div :class="invalidSource ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-select-source">Source</label>
        <select v-model="newRepo.codehubData.source" name="add-select-source" id="id-add-select-source" size="1">
          <option v-for="(source, index) in sources" :key="index" :value="source.value">{{source.name}}</option>
        </select>
      </div>
      <div :class="invalidStatus ? 'ch-add--input ch-add--input-alert' : 'ch-add--input'">
        <label for="id-add-select-status">Status</label>
        <select v-model="newRepo.codehubData.badges.status" name="add-select-status" id="id-add-select-status" size="1">
          <option v-for="(status, index) in statuses" :key="index" :value="status.value">{{status.name}}</option>
        </select>
      </div>
      <div class="ch-add--input ch-add--input-disable">
        <label for="id-add-input-name">Name</label>
        <input disabled type="text" v-model="newRepo.sourceData.name" name="add-input-name" id="id-add-input-name" placeholder="Computed from URL...">
      </div>
      <div class="ch-add--input ch-add--input-disable">
        <label for="id-add-input-owner">Owner</label>
        <input disabled type="text" v-model="newRepo.sourceData.owner.name" name="add-input-owner" id="id-add-input-owner" placeholder="Computed from URL...">
      </div>
      <div class="ch-add--categories">
        <div :class="invalidCategories ? 'ch-add--categories-list ch-add--input-alert' : 'ch-add--categories-list'">
          <label>Categories</label>
          <ul>
            <li v-for="(item,index) in repoCategories" :key="index">
              <input type="checkbox" v-model="item.selected">
              {{item.name}}
              <label>({{item.id}})</label>
            </li>
          </ul>
        </div>
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
      repoCategories: [],
      newRepo: {
        sourceData: {
          name: null,
          repositoryUrl: null,
          owner: {
            name: null
          }
        },
        codehubData: {
          source: null,
          isVisible: true,
          isIngestionEnabled: true,
          etag: 'N/A',
          badges: {
            status: 'pending',
            isFeatured: false,
          },
          categories: [],
          lastModified: null
        }
      },
      invalidName: false,
      invalidOwner: false,
      invalidUrl: false,
      invalidSource: false,
      invalidStatus: false,
      invalidCategories: false
    }
  },
  created: function() {
    this.repoCategories = this.$store.state.categories.filter(x => x.isEnabled);
    this.repoCategories.forEach(x => x.selected = false);
  },
  computed: {
    sources: {
      get: function() {return Utils.getSourceList();}
    },
    statuses: {
      get: function() {return Utils.getStatusList();}
    },
    processing: {
      get: function() {return this.$store.state.is_processing; },
      set: function(val) { this.$store.commit('setIsProcessing', val)}
    },
    processingError: {
      get: function() {return this.$store.state.processing_error; }
    },
    processingMessage: {
      get: function() {return this.$store.state.processing_message;},
      set: function(val) {this.$store.state.processing_message = val;}
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
      this.invalidName = !this.newRepo.sourceData.name || this.newRepo.sourceData.name ==='';
      this.invalidOwner = !this.newRepo.sourceData.owner.name || this.newRepo.sourceData.owner.name ==='';
      this.invalidUrl = !this.newRepo.sourceData.repositoryUrl || this.newRepo.sourceData.repositoryUrl ==='';
      this.invalidSource = !this.newRepo.codehubData.source || this.newRepo.codehubData.source ==='';
      this.invalidStatus = !this.newRepo.codehubData.badges.status || this.newRepo.codehubData.badges.status ==='';
      this.invalidCategories = this.repoCategories.filter( x => x.selected).length === 0;

      this.error = this.invalidSource || this.invalidOwner || this.invalidUrl || this.invalidSource || this.invalidStatus || this.invalidCategories;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else {
        this.newRepo.codehubData.categories = this.repoCategories.map( x => x.selected ? x.id : null).filter(x => x != null);
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
      let parts = this.newRepo.sourceData.repositoryUrl.split('/');
      if (!this.newRepo.sourceData.repositoryUrl.match(regex) || parts.length<5) {
        this.invalidUrl = true;
        this.newRepo.name = null;
        this.newRepo.owner = null;
        return;
      }

      this.invalidUrl = false;
      this.newRepo.sourceData.name = parts[parts.length-1];
      this.newRepo.sourceData.owner.name = parts[parts.length-2];

      let sourceList = Utils.getSourceList();
      for(let i=0; i<sourceList.length; i++) {
        let source = sourceList[i];
        if (this.newRepo.sourceData.repositoryUrl.indexOf(source.value) >= 0) {
          this.newRepo.codehubData.source = source.value;
          break;
        }
      }
    }
  }
}
</script>