import {shallowMount} from '@vue/test-utils';
import CHControls from '@/components/ch-controls.vue';
import { expect } from 'chai';

describe('components/ch-controls.vue', () => {
  let $store;
  let $router;
  let dispatchMethod;
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
        repos: [{selected: true}]
      },
      dispatch: function(method){
        dispatchMethod = method;
      },
      commit: function(action, payload) {
        commitAction = action;
        commitPayload = payload;
      }
    }
  });

  it('test reloadClicked', () => {
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.reloadClicked();
    expect(dispatchMethod).to.equal('getAll');
  });

  it('test addClicked', () => {
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.addClicked();
    expect(pathObj.path).to.equal('/add');
  });

  it('test removeClicked', () => {
    $store.state.repos= [{selected: true}];
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.removeClicked();
    expect(commitAction).to.equal('setSelectedRepos');
    expect(commitPayload.length>0).to.be.true;
    expect(pathObj.path).to.equal('/remove');
  });

  it('test removeClicked no data', () => {
    $store.state.repos= [{selected: false}];
    commitAction = undefined;
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.removeClicked();
    expect(commitAction).to.not.equal('setSelectedRepos');
  });

  it('test updateClicked', () => {
    $store.state.repos= [{selected: true}];
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.updateClicked();
    expect(commitAction).to.equal('setSelectedRepos');
    expect(commitPayload.length>0).to.be.true;
    expect(pathObj.path).to.equal('/update');
  });

  it('test updateClicked no data', () => {
    $store.state.repos= [{selected: false}];
    commitAction = undefined;
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.updateClicked();
    expect(commitAction).to.not.equal('setSelectedRepos');
  });

  it('test resetClicked', () => {
    $store.state.repos= [{selected: true}];
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.resetClicked();
    expect(commitAction).to.equal('setSelectedRepos');
    expect(commitPayload.length>0).to.be.true;
    expect(pathObj.path).to.equal('/reset');
  });

  it('test resetClicked no data', () => {
    $store.state.repos= [{selected: false}];
    commitAction = undefined;
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.resetClicked();
    expect(commitAction).to.not.equal('setSelectedRepos');
  });

  it('test getSelectedRepos', () => {
    $store.state.repos= [{selected: true}];
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    let result = wrapper.vm.getSelectedRepos();
    expect(result[0].selected).to.be.true;
  });

  it('test getSelectedRepos no data', () => {
    $store.state.repos= [{selected: false}];
    const wrapper = shallowMount(CHControls, { attachTo: document.body, mocks: { $store, $router }});
    let result = wrapper.vm.getSelectedRepos();
    expect(result.length==0).to.be.true;
  });
  
});
