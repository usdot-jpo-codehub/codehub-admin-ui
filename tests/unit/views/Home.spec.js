import {shallowMount} from '@vue/test-utils';
import home from '@/views/Home.vue';
import { expect } from 'chai';
import MOCK_REPOSITORIES from '@/mockdata/mock-repositories.json';

describe('Home.vue', () => {
  let $store;
  let $router;
  let commitAction;
  let commitPayload;
  let pathObj;

  beforeEach(() => {
    $router = {
      push: function(obj){
        pathObj = obj;
      }
    };

    $store = {
      state: {
        filtered_repos: [],
        categories: [],
        filter_text: '',
        repos: []
      },
      dispatch: function(){},
      commit: function(action, payload){
        commitAction = action;
        commitPayload = payload;
      }
    }
  });


  it('has component CHRepo', () => {
    $store.state.filtered_repos = MOCK_REPOSITORIES;
    const wrapper = shallowMount(home, { attachTo: document.body, mocks: { $store }});
    let item = wrapper.find('chrepo-stub');
    expect(item.exists()).to.be.true
  });
  it('renders the expected number of repositories', () => {
    $store.state.filtered_repos = MOCK_REPOSITORIES;
    const wrapper = shallowMount(home, { attachTo: document.body, mocks: { $store }});
    let items = wrapper.findAll('chrepo-stub');
    expect(items.length).to.be.equal(MOCK_REPOSITORIES.length);
  });
  it('renders repositories base on filter', () => {
    $store.state.filtered_repos = [MOCK_REPOSITORIES[0]];
    $store.state.filter_text = 'codehub-admin-api';
    const wrapper = shallowMount(home, { attachTo: document.body, mocks: { $store }});
    let items = wrapper.findAll('chrepo-stub');
    expect(1).to.be.equal(items.length);
  });
  it('renders repositories without filter', () => {
    $store.state.filtered_repos = [];
    $store.state.filter_text = '';
    $store.state.repos = MOCK_REPOSITORIES;
    const wrapper = shallowMount(home, { attachTo: document.body, mocks: { $store }});
    let items = wrapper.findAll('chrepo-stub');
    expect(MOCK_REPOSITORIES.length).to.be.equal(items.length);
  });
  it('test actionCallBack update', async() => {
    const wrapper = shallowMount(home, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.actionCallBack('update', MOCK_REPOSITORIES[0]);
    await wrapper.vm.$nextTick();
    expect('setSelectedRepos').to.be.equal(commitAction);
    expect(commitPayload[0].id).to.be.equal(MOCK_REPOSITORIES[0].id);
    expect("/update").to.be.equal(pathObj.path);
  });
  it('test actionCallBack remove', async() => {
    const wrapper = shallowMount(home, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.actionCallBack('remove', MOCK_REPOSITORIES[0]);
    await wrapper.vm.$nextTick();
    expect('setSelectedRepos').to.be.equal(commitAction);
    expect(commitPayload[0].id).to.be.equal(MOCK_REPOSITORIES[0].id);
    expect("/remove").to.be.equal(pathObj.path);
  });

});
