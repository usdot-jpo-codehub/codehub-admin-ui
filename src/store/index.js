import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Utils from '../utils/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    selected_repos: [],
    selected_category: null,
    filtered_repos: [],
    filter_text: '',
    filter_by: 'byName',
    is_loading: false,
    is_processing: false,
    processing_error: false,
    processing_message: '',
    processing_id: null,
    is_mobile: false,
    auth_token: '',
    version: JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON || '%7Bversion%3A0%7D')).version,
    categories: [],
    categoryFilter: '',
    categoryImages: [],
    engagementPopupFilter: '',
    engagementPopups: [],
    selectedEngagementPopup: null
  },
  mutations: {
    setRepos(state, val) {
      state.repos = val;
    },
    setSelectedRepos(state, val) {
      state.selected_repos = val;
    },
    setIsLoading(state, val) {
      state.is_loading = val;
    },
    setIsProcessing(state, val) {
      state.is_processing = val;
    },
    setProcessingError(state, val) {
      state.processing_error = val;
    },
    setProcessingMessage(state, val) {
      state.processing_message = val;
    },
    setProcessingId(state, val) {
      state.processing_id = val;
    },
    setIsMobile(state, val) {
      state.is_mobile = val;
    },
    setFilterText(state, val) {
      state.filter_text = val;
    },
    setFilteredRepos(state, val) {
      state.filtered_repos = val;
    },
    setAuthToken(state, val) {
      state.auth_token = val;
    },
    setCategories(state, val) {
      state.categories = val;
    },
    setSelectedCategory(state, val) {
      state.selected_category = val;
    },
    setCategoryFilter(state, val) {
      state.categoryFilter = val;
    },
    setCategoryImages(state, val) {
      state.categoryImages = val;
    },
    setEngagementPopupFilter(state, val) {
      state.engagementPopupFilter = val;
    },
    setEngagementPopups(state, val) {
      state.engagementPopups = val;
    },
    setSelectedEngagementPopup(state, val) {
      state.selectedEngagementPopup = val;
    }
  },
  actions: {
    getAll({commit, state}) {
      commit('setIsLoading', true);
      commit('setRepos', []);
      commit('setSelectedRepos', []);
      commit('setFilteredRepos', []);
      commit('setFilterText', '');

      const repositories = axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true,
        url: '/api/v1/repositories'
      });

      const categories = axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true,
        url: '/api/v1/configurations/categories'
      });

      Promise.all([repositories, categories]).then( response => {
        let reposResp = response[0];
        let categoriesResp = response[1];
        if (Utils.validResponse(reposResp) && Utils.validResponse(categoriesResp)) {
          let categoriesData = [...categoriesResp.data.result];
          for(let i = 0; i<categoriesData.length; i++) {
            categoriesData[i].selected = false;
          }
          commit('setCategories', categoriesData);

          let reposData = [...reposResp.data.result];
          for(let i=0; i<reposData.length; i++){
            reposData[i].selected = false;
            reposData[i] = Utils.resolveCategories(reposData[i], categoriesData);
          }
          commit('setRepos', reposData);
        }
        commit('setIsLoading', false);
      }).catch( () => {
        commit('setIsLoading', false);
      });

    },
    addRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);

      const repoConn = axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: transacData.data,
        crossDomain: true,
        url: '/api/v1/repositories'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')
      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!Utils.validResponse(repoResp)) {
          let msg = Utils.getErrorMessages(repoResp); 
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);

      }).catch((error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    updateRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      delete transacData.data.selected;

      const repoConn = axios({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: transacData.data,
        crossDomain: true,
        url: '/api/v1/repositories'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')
      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!Utils.validResponse(repoResp)) {
          let msg = Utils.getErrorMessages(repoResp); 
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);

      }).catch((error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    deleteRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      let reposIds = [];
      for(let i=0; i<transacData.data.length; i++) {
        reposIds.push(transacData.data[i].id);
      }

      const repoConn = axios({
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: reposIds,
        crossDomain: true,
        url: '/api/v1/repositories'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!Utils.validResponse(repoResp)) {
          let msg = Utils.getErrorMessages(repoResp); 
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);

      }).catch((error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    resetCacheRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      let reposIds = [];
      for(let i=0; i<transacData.data.length; i++) {
        reposIds.push(transacData.data[i].id);
      }

      const repoConn = axios({
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: reposIds,
        crossDomain: true,
        url: '/api/v1/repositories/resetcache'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!Utils.validResponse(repoResp)) {
          let msg = Utils.getErrorMessages(repoResp); 
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);

      }).catch((error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    getCategories({commit, state}) {
      commit('setCategories', []);
      let options =  {
        headers: {
          'Content-Type':'application/json',
          'CHTOKEN': state.auth_token
        }
      };
      axios
      .get('/api/v1/configurations/categories', options)
      .then( response => {
        if (response.data.code == 200) {
          if (response.data.result) {
            for(let i = 0; i<response.data.result.length; i++) {
              response.data.result[i].selected = false;
            }
            commit('setCategories', response.data.result);
          }
        }
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    addCategory({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true
      }

      axios
      .post('/api/v1/configurations/categories', transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      });
    },
    removeCategory({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true
      }

      axios
      .delete(`/api/v1/configurations/categories/${transacData.data.id}`, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      });
    },
    updateCategory({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true
      }

      axios
      .put('/api/v1/configurations/categories', transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      });
    },
    fetchCategoryImages({commit, state}) {
      commit('setCategoryImages', []);
      let options =  {
        headers: {
          'Content-Type':'application/json',
          'CHTOKEN': state.auth_token
        }
      };
      axios
      .get('/api/v1/images/categories', options)
      .then( response => {
        if (response.data.code == 200) {
          if (response.data.result) {
            commit('setCategoryImages', response.data.result);
          }
        }
      })
      .catch( (error) => {
        commit('setIsProcessing', false);
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
      })
    },
    getEngagementPopups({commit, state}) {
      commit('setEngagementPopups', []);
      commit('setSelectedEngagementPopup', null);
      let options =  {
        headers: {
          'Content-Type':'application/json',
          'CHTOKEN': state.auth_token
        }
      };
      axios
      .get('/api/v1/configurations/engagementpopups', options)
      .then( response => {
        if (response.data.code == 200) {
          if (response.data.result) {
            response.data.result.sort((a,b) => {
              if (a.isActive <= b.isActive) {
                return 1;
              }
              return -1;
            })
            commit('setEngagementPopups', response.data.result);
          }
        }
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    updateEngagementPopups({commit, state}, transacData) {
      commit('setProcessingError', false);
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingMessage', 'Processing...')

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true
      }

      axios
      .put('/api/v1/configurations/engagementpopups', transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      });
    },
    addEngagementPopups({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true
      }

      axios
      .post('/api/v1/configurations/engagementpopups', transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      });
    },
    removeEngagementPopups({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true
      }

      axios
      .delete(`/api/v1/configurations/engagementpopups/${transacData.data.id}`, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      });
    }
  }

})
