import {shallowMount, createLocalVue} from '@vue/test-utils';
import VueRouter from 'vue-router';
import EngagementPopup from '@/views/EngagementPopup.vue';
import { expect } from 'chai';
import routes from '@/mockdata/mock-routes.js';

describe('EngagementPopup.vue', () => {
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
        engagementPopupFilter: ''
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
    router.push({path:'/engagementpopup'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    await wrapper.vm.$nextTick();
    let buttons = wrapper.findAll('button');
    let inp = wrapper.find('#id-engagementpopup-search');
    expect(2).to.equal(buttons.length)
    expect(inp.is('input')).to.be.true;
    expect(inp.attributes('type')).to.equal('search');
  });

  it('test if controlss are hidden', async() => {
    router.push({path:'/'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    await wrapper.vm.$nextTick();
    let buttons = wrapper.findAll('button');
    let inp = wrapper.find('#id-engagementpopup-search');
    expect(buttons.exists()).to.be.false;
    expect(inp.exists()).to.be.false;
  });

  it('test method listEngagementPopups refresh', async() => {
    router.push({path:'/engagementpopup'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    wrapper.vm.listEngagementPopups();
    await wrapper.vm.$nextTick();
    expect(dispatchMethod).to.equal('getEngagementPopups')
    expect(dispatchPayload).to.be.undefined;
  });

  it('test method listEngagementPopups open page', async() => {
    router.push({path:'/'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    wrapper.vm.listEngagementPopups();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).to.equal('/engagementpopup')
  });

  it('test set filter', async() => {
    router.push({path:'/engagementpopup'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    let filter = 'test';
    wrapper.vm.engagementPopupFilter = filter;
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setEngagementPopupFilter')
    expect(commitPayload).to.equal(filter);
  });

  it('test set filter null value', async() => {
    router.push({path:'/engagementpopup'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    wrapper.vm.engagementPopupFilter = null;
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setEngagementPopupFilter')
    expect(commitPayload).to.equal('');
  });

  it('test addEngagementPopup', async() => {
    router.push({path:'/engagementpopup'});
    const wrapper = shallowMount(EngagementPopup, { localVue, router, mocks: { $store }});
    wrapper.vm.addEngagementPopup();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).to.equal('/engagementpopup/add')
  });


});
