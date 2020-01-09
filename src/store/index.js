import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Utils from '../utils/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    selected_repos: [],
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
    version: JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON || '%7Bversion%3A0%7D')).version
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

      Promise.all([repositories]).then( response => {
        let reposResp = response[0];
        if (Utils.validResponse(reposResp)) {
          let reposData = [...reposResp.data.result];
          for(let i=0; i<reposData.length; i++){
            reposData[i].selected = false;
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
    }
  }
})
