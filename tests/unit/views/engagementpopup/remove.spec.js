import {shallowMount} from '@vue/test-utils';
import engagementPopupRemove from '@/views/engagementpopup/remove.vue';
import { expect } from 'chai';

describe('EngagementPoup/remove.vue', () => {
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
    const wrapper = shallowMount(engagementPopupRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/engagementpopup');
  });

  it('test removeClicked no error', async() => {
    const wrapper = shallowMount(engagementPopupRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({confirmation: 'Delete' });
    wrapper.vm.removeClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidConfirmation).to.be.false;
    expect(dispatchMethod).to.equal('removeEngagementPopups');
    expect(dispatchPayload.id).to.equal('RemoveEngagementPopup');
  });

  it('test removeClicked invalid confirmation', async() => {
    const wrapper = shallowMount(engagementPopupRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({confirmation: '' });
    wrapper.vm.removeClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidConfirmation).to.be.true;
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(engagementPopupRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(wrapper.vm.message).to.equal('Done!');
      expect(pathObj.path).to.equal('/engagementpopup');
      done();
    }, 500);

  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(engagementPopupRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

});
