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
    }
}