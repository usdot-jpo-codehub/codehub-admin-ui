import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Utils from '../utils/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    projects: [],
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
    setProjects(state, val) {
      state.projects = val;
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
      commit('setProjects', []);
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

      const projects = axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        crossDomain: true,
        url: '/api/v1/projects'
      })

      Promise.all([repositories, projects]).then( response => {
        let reposResp = response[0];
        let projectsResp = response[1];
        if (Utils.validResponse(reposResp)) {
          let reposData = [...reposResp.data.result];
          if(Utils.validResponse(projectsResp)) {
            let projectsData = [...projectsResp.data.result];

            for(let i=0; i< reposData.length; i++) {
              reposData[i].selected = false;
              reposData[i].status = null;
              reposData[i].featured = null;
              let pa = projectsData.filter( p => p.id == reposData[i].id);
              if (pa.length > 0) {
                if (pa[0].badges) {
                  reposData[i].status = pa[0].badges.status;
                  reposData[i].featured = pa[0].badges.featured;
                }
              } 
            }
            commit('setRepos', reposData);
            commit('setProjects', projectsData);
          }
        }
        commit('setIsLoading', false);
      }).catch( () => {
        commit('setIsLoading', false);
      });

    },
    addRepo({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      let data = transacData.data;
      let repoData = {
        name: data.name,
        owner: data.owner,
        repo: data.repo,
        url: data.url,
        source: data.source,
        enabled: data.enabled
      };

      let projectData = {
        repository_url: data.url,
        badges: {
          status: data.status,
          featured: data.featured
        }
      } 
      const repoConn = axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: repoData,
        crossDomain: true,
        url: '/api/v1/repositories'
      });

      const projectConn = axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: projectData,
        crossDomain: true,
        url: '/api/v1/projects'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')
      Promise.all([repoConn, projectConn]).then( (response) => {
        let repoResp = response[0];
        let projectResp = response[1];

        if (!Utils.validResponse(repoResp) || !Utils.validResponse(projectResp)) {
          let msg = Utils.getErrorMessages(repoResp) +' | '+Utils.getErrorMessages(projectResp); 
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
      let data = transacData.data;
      let repoData = {
        id: data.id,
        name: data.name,
        owner: data.owner,
        repo: data.repo,
        url: data.url,
        source: data.source,
        enabled: data.enabled
      };

      let projectData = {
        id: data.id,
        repository_url: data.url,
        badges: {
          status: data.status,
          featured: data.featured
        }
      } 
      const repoConn = axios({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: repoData,
        crossDomain: true,
        url: '/api/v1/repositories'
      });

      const projectConn = axios({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: projectData,
        crossDomain: true,
        url: '/api/v1/projects'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')
      Promise.all([repoConn, projectConn]).then( (response) => {
        let repoResp = response[0];
        let projectResp = response[1];

        if (!Utils.validResponse(repoResp) || !Utils.validResponse(projectResp)) {
          let msg = Utils.getErrorMessages(repoResp) +' | '+Utils.getErrorMessages(projectResp); 
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

      const projectConn = axios({
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'CHTOKEN': state.auth_token
        },
        data: reposIds,
        crossDomain: true,
        url: '/api/v1/projects'
      });

      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      Promise.all([repoConn, projectConn]).then( (response) => {
        let repoResp = response[0];
        let projectResp = response[1];

        if (!Utils.validResponse(repoResp) || !Utils.validResponse(projectResp)) {
          let msg = Utils.getErrorMessages(repoResp) +' | '+Utils.getErrorMessages(projectResp); 
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
