import {shallowMount, createLocalVue} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Categories from '@/views/categories.vue';
import { expect } from 'chai';
import MOCK_CATEGORIES from '@/mockdata/mock-categories.json';
import routes from '@/mockdata/mock-routes.js';

describe('categories.vue', () => {
  let localVue;
  let router;
  let $store;
  let dispatchMethod;
  let dispatchPayload;
  let commitAction;
  let commitPayload;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({routes});

    $store = {
      state: {
        categories: MOCK_CATEGORIES,
        categoryFilter: ''
      },
      dispatch: function(method, payload){
        dispatchMethod = method;
        dispatchPayload = payload;
      },
      commit: function(action, payload) {
        commitAction = action;
        commitPayload = payload;
      }
    }
  });

  it('test if display the controls', async() => {
    router.push({path:'/categories'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    await wrapper.vm.$nextTick();
    let buttons = wrapper.findAll('button');
    let inp = wrapper.find('#id-category-search');
    expect(2).to.equal(buttons.length)
    expect(inp.is('input')).to.be.true;
    expect(inp.attributes('type')).to.equal('search');
  });

  it('test if controlss are hidden', async() => {
    router.push({path:'/'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    await wrapper.vm.$nextTick();
    let buttons = wrapper.findAll('button');
    let inp = wrapper.find('#id-category-search');
    expect(buttons.exists()).to.be.false;
    expect(inp.exists()).to.be.false;
  });

  it('test method listCategories refresh', async() => {
    router.push({path:'/categories'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    wrapper.vm.listCategories();
    await wrapper.vm.$nextTick();
    expect(dispatchMethod).to.equal('getCategories')
    expect(dispatchPayload).to.be.undefined;
  });

  it('test method listCategories open page', async() => {
    router.push({path:'/'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    wrapper.vm.listCategories();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).to.equal('/categories')
  });

  it('test set filter', async() => {
    router.push({path:'/categories'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    let filter = 'test';
    wrapper.vm.categoryFilter = filter;
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setCategoryFilter')
    expect(commitPayload).to.equal(filter);
  });

  it('test set filter null value', async() => {
    router.push({path:'/categories'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    wrapper.vm.categoryFilter = null;
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setCategoryFilter')
    expect(commitPayload).to.equal('');
  });

  it('test addCategory', async() => {
    router.push({path:'/categories'});
    const wrapper = shallowMount(Categories, { localVue, router, mocks: { $store }});
    wrapper.vm.addCategory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).to.equal('/categories/add')
  });


});
