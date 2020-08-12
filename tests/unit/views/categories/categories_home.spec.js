import {shallowMount} from '@vue/test-utils';
import CategoriesHome from '@/views/categories/categories_home.vue';
import { expect } from 'chai';

describe('categories/categories_home.vue', () => {
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
        categoryFilter: '',
        categories: []
      },
      dispatch: function(){
      },
      commit: function(prop, payload) {
        commitAction = prop;
        commitPayload = payload;
      }
    }
  });

  it('test actionCallback no data', async() => {
    $store.state.categories = [];
    const wrapper = shallowMount(CategoriesHome, { attachTo: document.body, mocks: { $store, $router }});
    let result = wrapper.vm.actionCallback('update', 'id');
    await wrapper.vm.$nextTick();
    expect(result).to.be.undefined;
  });

  it('test actionCallback id not found', async() => {
    $store.state.categories = [{id:'id',name:'name'}];
    const wrapper = shallowMount(CategoriesHome, { attachTo: document.body, mocks: { $store, $router }});
    let result = wrapper.vm.actionCallback('update', 'id-not-in-list');
    await wrapper.vm.$nextTick();
    expect(result).to.be.undefined;
  });

  it('test actionCallback update', async() => {
    $store.state.categories = [{id:'id',name:'name'}];
    const wrapper = shallowMount(CategoriesHome, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.actionCallback("update", "id");
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setSelectedCategory');
    expect(commitPayload.id).to.equal('id');
    expect(pathObj.path).to.equal('/categories/update');
  });

  it('test actionCallback remove', async() => {
    $store.state.categories = [{id:'id',name:'name'}];
    const wrapper = shallowMount(CategoriesHome, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.actionCallback("remove", "id");
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setSelectedCategory');
    expect(commitPayload.id).to.equal('id');
    expect(pathObj.path).to.equal('/categories/remove');
  });
});
