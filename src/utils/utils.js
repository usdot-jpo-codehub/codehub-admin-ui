import axios from 'axios';

export default {
    validResponse(response) {
      return response && response.status && response.status === 200 && response.data && response.data.code == 200;
    },
    getErrorMessages(response) {
      if (!this.validResponse(response)) {
        if (response.data) {
          let msg = response.data.status;
          if (response.data.errors && response.data.errors.length > 0) {
            for(let i=0 ; i<response.data.errors.length; i++) {
              msg += ' => '+response.data.errors[i].message;
            }
          }
          return msg;
        }
      }
      return '';
    },
    getStatusList() {
      let statusList = [];
      statusList.push({name:'active', value:'active'});
      statusList.push({name:'inactive', value:'inactive'});
      statusList.push({name:'pending', value:'pending'});
      statusList.push({name:'read-only', value:'pending'});
      return statusList;
    },
    getSourceList() {
      let sourceList = [];
      sourceList.push({name:'github', value:'github'});
      return sourceList;
    },
    resolveCategories(repository, categories) {
      if (!repository || !repository.codehubData || !repository.codehubData.categories || repository.codehubData.categories.length == 0 ) {
        return repository;
      }

      for(let i=0; i<repository.codehubData.categories.length; i++){
        let repoCatId = repository.codehubData.categories[i];
        let cat = categories.filter(x => x.id == repoCatId )
        if (cat.length == 0) {
          continue;
        }
        repository.codehubData.categories[i] = cat[0];
      }
      return repository;
    },
    getAxios(method, token, data, url) {
      let axObj = {
        method: method,
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': token
        },
        data: data,
        crossDomain: true,
        url: url
      }
      return axios(axObj);
    }
}
