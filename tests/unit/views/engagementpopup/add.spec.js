import {shallowMount} from '@vue/test-utils';
import engagementPopupAdd from '@/views/engagementpopup/add.vue';
import { expect } from 'chai';

describe('EngagementPoup/add.vue', () => {
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
        processing_error: false
      },
      dispatch: function(method, payload){
        dispatchMethod = method;
        dispatchPayload = payload;
      },
      commit: function() {
      }
    }
  });

  it('test cancel clicked', () => {
    const wrapper = shallowMount(engagementPopupAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/engagementpopup');
  });

  it('test addClicked no error', async() => {
    const wrapper = shallowMount(engagementPopupAdd, { attachTo: document.body, mocks: { $store, $router }});
    let mockData = {
      id: null,
      name: 'testing...',
      isActive: false,
      description: '',
      lastModified: null,
      content: '<h1>Testing</h1>',
      controlsColor: 'black',
      controlsShadow: 'white'
    }
    wrapper.setData({newEngagementPopup: mockData, confirmation: 'Add' });
    wrapper.vm.addClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidContent).to.be.false;
    expect(wrapper.vm.invalidConfirmation).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('addEngagementPopups');
    expect(dispatchPayload.id).to.equal('AddEngagementPopup');
  });

  it('test addClicked error', async() => {
    const wrapper = shallowMount(engagementPopupAdd, { attachTo: document.body, mocks: { $store, $router }});
    let mockData = {
      id: null,
      name: '',
      isActive: false,
      description: '',
      lastModified: null,
      content: '',
      controlsColor: 'black',
      controlsShadow: 'white'
    }
    wrapper.setData({newEngagementPopup: mockData, confirmation: 'Add' });
    wrapper.vm.addClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.true;
    expect(wrapper.vm.invalidContent).to.be.true;
    expect(wrapper.vm.invalidConfirmation).to.be.false;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.');
  });

  it('test addClicked no error invalid confirmation', async() => {
    const wrapper = shallowMount(engagementPopupAdd, { attachTo: document.body, mocks: { $store, $router }});
    let mockData = {
      id: null,
      name: 'testing...',
      isActive: false,
      description: '',
      lastModified: null,
      content: '<h1>Testing</h1>',
      controlsColor: 'black',
      controlsShadow: 'white'
    }
    wrapper.setData({newEngagementPopup: mockData, confirmation: '' });
    wrapper.vm.addClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidContent).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(wrapper.vm.invalidConfirmation).to.be.true;
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(engagementPopupAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(wrapper.vm.message).to.equal('Done!');
      expect(pathObj.path).to.equal('/engagementpopup');
      done();
    }, 500);

  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(engagementPopupAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

});
