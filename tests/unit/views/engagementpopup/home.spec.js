import {shallowMount} from '@vue/test-utils';
import engagementPopupHome from '@/views/engagementpopup/home.vue';
import { expect } from 'chai';

describe('EngagementPoup/home.vue', () => {
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
        engagementPopupFilter: '',
        engagementPopups: []
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
    $store.state.engagementPopups = [];
    const wrapper = shallowMount(engagementPopupHome, { attachTo: document.body, mocks: { $store, $router }});
    let result = wrapper.vm.actionCallback('update', 'id');
    await wrapper.vm.$nextTick();
    expect(result).to.be.undefined;
  });

  it('test actionCallback update', async() => {
    $store.state.engagementPopups = [{id:'id',name:'name'}];
    const wrapper = shallowMount(engagementPopupHome, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.actionCallback("update", "id");
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setSelectedEngagementPopup');
    expect(commitPayload.id).to.equal('id');
    expect(pathObj.path).to.equal('/engagementpopup/update');
  });

  it('test actionCallback remove', async() => {
    $store.state.engagementPopups = [{id:'id',name:'name'}];
    const wrapper = shallowMount(engagementPopupHome, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.actionCallback("remove", "id");
    await wrapper.vm.$nextTick();
    expect(commitAction).to.equal('setSelectedEngagementPopup');
    expect(commitPayload.id).to.equal('id');
    expect(pathObj.path).to.equal('/engagementpopup/remove');
  });
});
