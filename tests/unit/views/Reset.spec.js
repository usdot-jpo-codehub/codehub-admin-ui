import {shallowMount} from '@vue/test-utils';
import reset from '@/views/Reset.vue';
import { expect } from 'chai';
import MOCK_REPOSITORIES from '@/mockdata/mock-repositories.json';

describe('Reset.vue', () => {
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
        processing_error: false
      },
      dispatch: function(method, payload){
        dispatchMethod = method,
        dispatchPayload = payload
      },
      commit: function(){}
    }
  });

  it('test resetClicked', async() => {
    const wrapper = shallowMount(reset, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({confirmation:'Reset'});
    wrapper.vm.resetClicked();
    await wrapper.vm.$nextTick();
    expect(dispatchMethod).to.equal('resetCacheRepo');
    expect(dispatchPayload.id).to.equal('Reset');
  });

  it('test resetClicked invalid confirmation', async() => {
    const wrapper = shallowMount(reset, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({confirmation:''});
    wrapper.vm.resetClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidConfirmation).to.be.true;
  });

  it('test cancelClicked', () => {
    const wrapper = shallowMount(reset, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    wrapper.vm.$nextTick();
    expect(pathObj.path).to.equal('/');
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(reset, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(()=>{
      expect(wrapper.vm.message).to.equal('Done!');
      expect(dispatchMethod).to.equal('getAll');
      expect(pathObj.path).to.equal('/');
      done();
    },500);
  });

  it('test closeView processing error', (done) => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(reset, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(()=>{
      expect(wrapper.vm.message).to.not.equal('Done!');
      done();
    },500);
  });

});
