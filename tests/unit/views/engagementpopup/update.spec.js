import {shallowMount} from '@vue/test-utils';
import engagementPopupUpdate from '@/views/engagementpopup/update.vue';
import { expect } from 'chai';

describe('EngagementPoup/update.vue', () => {
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
        processing_error: false,
        selectedEngagementPopup: {
          id: "id",
          name: 'testing...',
          isActive: false,
          description: '',
          lastModified: null,
          content: '<h1>Testing</h1>',
          controlsColor: 'black',
          controlsShadow: 'white'
        }
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
    const wrapper = shallowMount(engagementPopupUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/engagementpopup');
  });

  it('test updateClicked no error', async() => {
    const wrapper = shallowMount(engagementPopupUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({newEngagementPopup: $store.state.selectedEngagementPopup, confirmation: 'Update' });
    wrapper.vm.updateClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidConfirmation).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('updateEngagementPopups');
    expect(dispatchPayload.id).to.equal('UpdateEngagementPopup');
  });

  it('test updateClicked error', () => {
    const wrapper = shallowMount(engagementPopupUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockData = $store.state.selectedEngagementPopup;
    mockData.name='';
    wrapper.setData({selectedEngagementPopup: mockData, confirmation: 'Add' });
    wrapper.vm.updateClicked();
    expect(wrapper.vm.invalidName).to.be.true;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.');
  });

  it('test updateClicked no error invalid confirmation', async() => {
    const wrapper = shallowMount(engagementPopupUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({selectedEngagementPopup: $store.state.selectedEngagementPopup, confirmation: '' });
    wrapper.vm.updateClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(wrapper.vm.invalidConfirmation).to.be.true;
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(engagementPopupUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(wrapper.vm.message).to.equal('Done!');
      expect(pathObj.path).to.equal('/engagementpopup');
      done();
    }, 500);

  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(engagementPopupUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

});
