import {shallowMount} from '@vue/test-utils';
import CategoriesRemove from '@/views/categories/categories_remove.vue';
import { expect } from 'chai';

describe('categories/categories_remove.vue', () => {
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
        selected_category: {}
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
    const wrapper = shallowMount(CategoriesRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/categories');
  });

  it('test removeClicked no error', async() => {
    const wrapper = shallowMount(CategoriesRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({confirmation: 'Delete' });
    wrapper.vm.removeClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidConfirmation).to.be.false;
    expect(dispatchMethod).to.equal('removeCategory');
    expect(dispatchPayload.id).to.equal('RemoveCategory');
  });

  it('test removeClicked invalid confirmation', async() => {
    const wrapper = shallowMount(CategoriesRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({confirmation: '' });
    wrapper.vm.removeClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidConfirmation).to.be.true;
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(CategoriesRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(wrapper.vm.message).to.equal('Done!');
      expect(pathObj.path).to.equal('/categories');
      done();
    }, 500);

  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(CategoriesRemove, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

});
