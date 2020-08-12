<template>
  <div class="ch-update--wrapper-h">
    <div class="ch-update--wrapper-v">
      
      <h1>Update Repository</h1>
      <div v-if="processingError || error" :class="processingError || error ? 'ch-update--message-alert':''">
        <span>{{processingMessage + message}}</span>
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
        <input type="checkbox" v-model="selectedRepo.codehubData.isIngestionEnabled" name="add-input-enabled" id="id-add-input-enabled">
        <span>Enabled</span>
        <input type="checkbox" v-model="selectedRepo.codehubData.isVisible" name="add-input-enabled" id="id-add-input-enabled">
        <span>Visible</span>
        <input type="checkbox" v-model="selectedRepo.codehubData.badges.isFeatured" name="add-input-featured" id="id-add-input-featured">
        <span>Featured</span>
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-input-name">Name</label>
        <input disabled type="text" v-model="selectedRepo.sourceData.name" name="add-input-name" id="id-add-input-name">
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-input-owner">Owner</label>
        <input disabled type="text" v-model="selectedRepo.sourceData.owner.name" name="add-input-owner" id="id-add-input-owner">
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-input-url">Url</label>
        <input disabled type="text" v-model="selectedRepo.sourceData.repositoryUrl" name="add-input-url" id="id-add-input-url">
      </div>
      <div class="ch-update--input ch-update--input-disable">
        <label for="id-add-select-source">Source</label>
        <select disabled v-model="selectedRepo.codehubData.source" name="add-select-source" id="id-add-select-source" size="1">
          <option value="github" selected>github</option>
        </select>
      </div>
      <div :class="invalidStatus ? 'ch-update--input ch-update--input-alert' : 'ch-update--input'">
        <label for="id-add-select-status">Status</label>
        <select v-model="selectedRepo.codehubData.badges.status" name="add-select-status" id="id-add-select-status" size="1">
          <option value="pending" selected>pending</option>
          <option value="read-only" selected>read-only</option>
          <option value="active" selected>active</option>
          <option value="inactive" selected>inactive</option>
        </select>
      </div>
      <div class="ch-update--categories">
        <div :class="invalidCategories ? 'ch-update-categories-list ch-update--input-alert' : 'ch-update-categories-list'">
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
    </div>
    
  </div>
</template>
<script>
import CHMixin from '@/mixins/ch-mixin.js';
export default {
  name: 'update',
  mixins: [CHMixin],
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false,
      selectedRepo: null,
      invalidName: false,
      invalidOwner: false,
      invalidRepo: false,
      invalidUrl: false,
      invalidSource: false,
      invalidStatus: false,
      invalidCategories: false,
      repoCategories: []
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
      let categories = [...this.$store.state.categories.filter(x => x.isEnabled)];
      categories.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
      categories.forEach(x => x.selected = false);
      if (!this.selectedRepo.codehubData.categories || this.selectedRepo.codehubData.categories.length==0) {
        this.repoCategories = categories;
        return;
      }

      for(let i=0; i<this.selectedRepo.codehubData.categories.length; i++) {
        let cat = this.selectedRepo.codehubData.categories[i];
        let filCat = categories.filter(x => x.id == cat.id);
        if (filCat.length > 0)
        {
          filCat[0].selected = true;
        }
      }
      this.repoCategories = categories;
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/'});
    },
    updateClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Update';

      this.invalidName = !this.selectedRepo.sourceData.name || this.selectedRepo.sourceData.name ==='';
      this.invalidOwner = !this.selectedRepo.sourceData.owner.name || this.selectedRepo.sourceData.owner.name ==='';
      this.invalidUrl = !this.selectedRepo.sourceData.repositoryUrl || this.selectedRepo.sourceData.repositoryUrl ==='';
      this.invalidSource = !this.selectedRepo.codehubData.source || this.selectedRepo.codehubData.source ==='';
      this.invalidStatus = !this.selectedRepo.codehubData.badges.status || this.selectedRepo.codehubData.badges.status ==='';
      this.invalidCategories = this.repoCategories.filter(x => x.selected).length === 0;

      this.error = this.invalidSource || this.invalidOwner || this.invalidUrl || this.invalidSource || this.invalidStatus || this.invalidCategories;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        this.selectedRepo.codehubData.categories = this.repoCategories.map( x => x.selected ? x.id : null).filter(x => x != null);
        let transacData = {
          data: this.selectedRepo,
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