import {shallowMount} from '@vue/test-utils';
import update from '@/views/Update.vue';
import { expect } from 'chai';
import MOCK_REPOSITORIES from '@/mockdata/mock-repositories.json';
import MOCK_CATEGORIES from '@/mockdata/mock-categories.json';

describe('Update.vue', () => {
  let $store;
  let $router;
  let dispatchMethod;
  let dispatchPayload;
  let pathObj;

  beforeEach(() => {
    $router = {
      push: function(obj){
        pathObj = obj;
      }
    };

    $store = {
      state: {
        selected_repos: [MOCK_REPOSITORIES[0]],
        categories: MOCK_CATEGORIES,
        processing_error: false
      },
      dispatch: function(method, payload){
        dispatchMethod = method,
        dispatchPayload = payload
      },
      commit: function(){}
    }
  });

  it('test repository without category', async() => {
    let mockData = MOCK_REPOSITORIES[0];
    mockData.codehubData.categories = [];
    $store.state.selected_repos = [mockData];
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.prepareData();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.repoCategories.length).to.equal(MOCK_CATEGORIES.length);
  });

  it('test no categories', async() => {
    $store.state.categories = []
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.prepareData();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.repoCategories.length).to.equal(0);
  });

  it('test with categories', () => {
    $store.state.categories = MOCK_CATEGORIES;
    let mockData = MOCK_REPOSITORIES[0];
    mockData.codehubData.categories[0] = MOCK_CATEGORIES[0];
    $store.state.selected_repos = [mockData];
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.prepareData();
    let selectedCategories = wrapper.vm.repoCategories.filter(x => x.selected == true);
    expect(selectedCategories.length).to.equal(1);
    expect(selectedCategories[0].id).to.equal(mockData.codehubData.categories[0].id);
  });

  it('test updateClicked error', () => {
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    let mockRepo= {
      codehubData: {
        source: ''
      }
    };
    wrapper.setData({confirmation: 'Update', selectedRepo: mockRepo});
    wrapper.vm.updateClicked();
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.')
  });

  it('test updateClicked no error', async() => {
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategories = MOCK_CATEGORIES;
    mockCategories[0].selected = true;
    let mockData = MOCK_REPOSITORIES[0];
    mockData.selected = true;
    mockData.codehubData.categories[0] = mockCategories[0];
    mockData.codehubData.source = 'github';
    wrapper.setData({selectedRepo: mockData, repoCategories: mockCategories, confirmation: 'Update'});
    wrapper.vm.updateClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidOwner).to.be.false;
    expect(wrapper.vm.invalidUrl).to.be.false;
    expect(wrapper.vm.invalidSource).to.be.false;
    expect(wrapper.vm.invalidStatus).to.be.false;
    expect(wrapper.vm.invalidCategories).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('updateRepo');
    expect(dispatchPayload.id).to.equal('Update');
  });
  it('test cancelClicked', async() => {
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    await wrapper.vm.$nextTick();
    expect(pathObj.path).to.equal('/');
  });
  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(update, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(()=>{
      expect(wrapper.vm.message).to.equal('Done!');
      expect(dispatchMethod).to.equal('getAll');
      expect(pathObj.path).to.equal('/');
      done();
    },500);
  });
  
});
