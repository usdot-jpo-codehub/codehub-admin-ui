import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../utils/utils.js'

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
    selectedEngagementPopup: null,
    completed: false
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
    },
    setCompleted(state, val) {
      state.completed = val;
    },
    setProcessingStatus(state, statusObj) {
      state.is_processing = statusObj.isProcessing;
      state.processing_error = statusObj.isError;
      state.processing_message = statusObj.message;
    }
  },
  actions: {
    getAll({commit, state}) {
      commit('setIsLoading', true);
      commit('setRepos', []);
      commit('setSelectedRepos', []);
      commit('setFilteredRepos', []);
      commit('setFilterText', '');

      const repositories = utils.getAxios('GET', state.auth_token, null, '/api/v1/repositories');
      const categories = utils.getAxios('GET', state.auth_token, null, '/api/v1/configurations/categories');
      Promise.all([repositories, categories]).then( response => {
        let reposResp = response[0];
        let categoriesResp = response[1];
        if (utils.validResponse(reposResp) && utils.validResponse(categoriesResp)) {
          let categoriesData = [...categoriesResp.data.result];
          for(let i = 0; i<categoriesData.length; i++) {
            categoriesData[i].selected = false;
          }
          commit('setCategories', categoriesData);

          let reposData = [...reposResp.data.result];
          for(let i=0; i<reposData.length; i++){
            reposData[i].selected = false;
            reposData[i] = utils.resolveCategories(reposData[i], categoriesData);
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

      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      const repoConn = utils.getAxios('POST', state.auth_token, transacData.data, '/api/v1/repositories');

      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!utils.validResponse(repoResp)) {
          let msg = utils.getErrorMessages(repoResp);
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: msg});
        }
        commit('setProcessingStatus',{isProcessing: false, isError: false, message: ''});

      }).catch((error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    updateRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      delete transacData.data.selected;
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      const repoConn = utils.getAxios('PUT', state.auth_token, transacData.data, '/api/v1/repositories');

      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!utils.validResponse(repoResp)) {
          let msg = utils.getErrorMessages(repoResp);
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: msg});
        }
        commit('setProcessingStatus',{isProcessing: false, isError: false, message: ''});

      }).catch((error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    deleteRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      let reposIds = [];
      for(let i=0; i<transacData.data.length; i++) {
        reposIds.push(transacData.data[i].id);
      }

      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      const repoConn = utils.getAxios('DELETE', state.auth_token, reposIds, '/api/v1/repositories');

      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!utils.validResponse(repoResp)) {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(repoResp)});
        }
        commit('setIsProcessing', false);

      }).catch((error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    resetCacheRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      let reposIds = [];
      for(let i=0; i<transacData.data.length; i++) {
        reposIds.push(transacData.data[i].id);
      }

      const repoConn = utils.getAxios('PATCH', state.auth_token, reposIds, '/api/v1/repositories/resetcache');


      Promise.all([repoConn]).then( (response) => {
        let repoResp = response[0];

        if (!utils.validResponse(repoResp)) {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(repoResp)});
        }
        commit('setIsProcessing', false);

      }).catch((error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    getCategories({commit, state}) {
      commit('setCategories', []);
      const axConn = utils.getAxios('GET', state.auth_token, null, '/api/v1/configurations/categories');
      axConn
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
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    addCategory({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});

      const axConn = utils.getAxios('POST', state.auth_token, transacData.data, '/api/v1/configurations/categories');
      axConn
      .then( response => {
        if (!utils.validResponse(response)) {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(response)});
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      });
    },
    removeCategory({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});

      const axConn = utils.getAxios('DELETE', state.auth_token, null, '/api/v1/configurations/categories/'+transacData.data.id);
      axConn
      .then( response => {
        if (!utils.validResponse(response)) {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(response)});
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      });
    },
    updateCategory({commit, state}, transacData) {
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      commit('setProcessingId', transacData.id);

      const axConn = utils.getAxios('PUT', state.auth_token, transacData.data, '/api/v1/configurations/categories');
      axConn
      .then( response => {
        if (!utils.validResponse(response)) {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(response)});
        }
        commit('setProcessingStatus',{isProcessing: false, isError: false, message: null});
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      });
    },
    fetchCategoryImages({commit, state}) {
      commit('setCategoryImages', []);
      const axConn = utils.getAxios('GET', state.auth_token, null, '/api/v1/images/categories');
      axConn
      .then( response => {
        if (response.data.code == 200) {
          if (response.data.result) {
            commit('setCategoryImages', response.data.result);
          }
        }
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    getEngagementPopups({commit, state}) {
      commit('setEngagementPopups', []);
      commit('setSelectedEngagementPopup', null);

      const axConn = utils.getAxios('GET', state.auth_token, null, '/api/v1/configurations/engagementpopups');
      axConn
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
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      })
    },
    updateEngagementPopups({commit, state}, transacData) {
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      commit('setProcessingId', transacData.id);

      const axConn = utils.getAxios('PUT', state.auth_token, transacData.data, '/api/v1/configurations/engagementpopups');
      axConn
      .then( response => {
        if (!utils.validResponse(response)) {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(response)});
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      });
    },
    addEngagementPopups({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});

      const axConn = utils.getAxios('POST', state.auth_token, transacData.data, '/api/v1/configurations/engagementpopups');
      axConn
      .then( response => {
        if (!utils.validResponse(response)) {
          let msg = utils.getErrorMessages(response);
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: msg});
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      });
    },
    removeEngagementPopups({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});

      const axConn = utils.getAxios('DELETE', state.auth_token, null, `/api/v1/configurations/engagementpopups/${transacData.data.id}`);
      axConn
      .then( response => {
        if (!utils.validResponse(response)) {
          let msg = utils.getErrorMessages(response);
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: msg});
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
      });
    },
    invalidateCloudfrontPath({ commit, state }, transacData) {
      commit('setProcessingStatus',{isProcessing: true, isError: false, message: 'Processing...'});
      commit('setProcessingId', transacData.id);

      const axConn = utils.getAxios('POST', state.auth_token, transacData.data, '/api/v1/invalidate');
      axConn
        .then(response => {
          if (!utils.validResponse(response)) {
            commit('setProcessingStatus',{isProcessing: false, isError: true, message: utils.getErrorMessages(response)});
          }
          commit('setIsProcessing', false);
          commit('setCompleted', true);
        })
        .catch((error) => {
          commit('setProcessingStatus',{isProcessing: false, isError: true, message: error});
        });
    }
  }
})
