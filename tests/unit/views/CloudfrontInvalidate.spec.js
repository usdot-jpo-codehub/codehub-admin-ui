import {shallowMount} from '@vue/test-utils';
import CloudfrontInvalidate from '@/views/CloudfrontInvalidate.vue';
import { expect } from 'chai';

describe('CloudfrontInvalidate.vue', () => {
  let $store;
  let dispatchMethod;
  let dispatchPayload;
  // let commitAction;
  // let commitPayload;

  beforeEach(() => {
    $store = {
      state: {
        processing_error: false,
        is_processing: false,
        processing_message: '',
        completed: false
      },
      dispatch: function(method, payload){
        dispatchMethod = method;
        dispatchPayload = payload;
      },
      commit: function() {
        // commitAction = action;
        // commitPayload = payload;
      }
    }
  });

  it('test invalidatePath valid path', async() => {
    const wrapper = shallowMount(CloudfrontInvalidate, { attachTo: document.body, mocks: { $store }});
    let testPath = '/testPath';
    wrapper.setData({cloudfrontInvalidate:testPath})
    wrapper.vm.invalidatePath();
    await wrapper.vm.$nextTick();
    expect(dispatchMethod).to.equal('invalidateCloudfrontPath');
    expect(dispatchPayload.id).to.equal('invalidatePath');
    expect(dispatchPayload.data.path).to.equal(testPath);
  });

  it('test invalidatePath invalid path', async() => {
    const wrapper = shallowMount(CloudfrontInvalidate, { attachTo: document.body, mocks: { $store }});
    wrapper.setData({cloudfrontInvalidate:null})
    let result = wrapper.vm.invalidatePath();
    await wrapper.vm.$nextTick();
    expect(result).to.be.undefined;
  });

  it('test closeView', (done) => {
    const wrapper = shallowMount(CloudfrontInvalidate, { attachTo: document.body, mocks: { $store }});
    wrapper.setData({processing_error:false})
    wrapper.vm.closeView();
    setTimeout(()=>{
      expect(wrapper.vm.message).to.equal('Done!');
      done();
    },500);
  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(CloudfrontInvalidate, { attachTo: document.body, mocks: { $store }});
    wrapper.setData({processing_error:true})
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

  it('test processing message', () => {
    let testMessage = 'testMessage';
    $store.state.processing_message = testMessage;
    const wrapper = shallowMount(CloudfrontInvalidate, { attachTo: document.body, mocks: { $store }});
    expect(wrapper.vm.processing_message).to.equal(testMessage);
  });

});
