import {shallowMount} from '@vue/test-utils';
import Add from '@/views/Add.vue';
import { expect } from 'chai';
import MOCK_CATEGORIES from '@/mockdata/mock-categories.json';

describe('Add.vue', () => {
  let $store;
  let $router;
  let commitAction;
  let commitPayload;
  let dispatchMethod;
  let dispatchPayload;
  let pathObj;
  const INVALID_FIELD_VALUE='Invalid field value.';

  beforeEach(() => {
    $router = {
      push: function(obj){
        pathObj = obj;
      }
    };

    $store = {
      state: {
        categories: MOCK_CATEGORIES,
        processing_error: false,
        processing_id: ''
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

  it('has H1 tag', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let title = wrapper.findAll('h1');
    expect(title.is('h1')).to.be.true;
  });
  it('has Title New Repository', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let title = wrapper.find('h1');
    expect('New Repository').to.be.equal(title.text());
  });
  it('has checkbox to enable', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-enabled');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('checkbox');
  });
  it('has label for enabled', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-enabled-label');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equal('Enabled');
  });
  it('has checkbox to Visible', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-visible');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('checkbox');
  });
  it('has label for Visible', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-visible-label');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equal('Visible');
  });
  it('has checkbox to Featured', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-featured');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('checkbox');
  });
  it('has label for Featured', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-featured-label');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equal('Featured');
  });
  it('has label for Url', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-url-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Url');
  });
  it('has input for Url', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-url');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('text');
  });
  it('has label for Source', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-select-source-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Source');
  });
  it('has select control for Source', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-select-source');
    expect(item.is('select')).to.be.true;
  });
  it('has select control for Source for Github', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-select-source');
    let op = item.find('option');
    expect(op.text()).to.equal('github');
  });
  it('has select control for Status', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-select-status');
    expect(item.is('select')).to.be.true;
  });
  it('has expected statuses', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-select-status');
    let options = item.findAll('option');
    expect(4).to.equal(options.length);
  });
  it('has label for Name', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-name-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Name');
  });
  it('has input for Name', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-name');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('text');
    expect(item.attributes('disabled')).to.equal('disabled');
  });
  it('has label for Owner', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-owner-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Owner');
  });
  it('has input for Owner', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-add-input-owner');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('text');
    expect(item.attributes('disabled')).to.equal('disabled');
  });
  it('display the available categories', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#id-ul-categories');
    expect(item.is('ul')).to.be.true;
    let inputs = item.findAll('input');
    expect(MOCK_CATEGORIES.length).to.equal(inputs.length);
  });
  it('has OK button', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#btnOk');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equal('Ok');
  });
  it('has Cancel button', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let item = wrapper.find('#btnCancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equal('Cancel');
  });

  it('test cancel clicked', () => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/');
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(dispatchMethod).to.equal('getAll');
      expect(dispatchPayload).to.be.undefined;
      expect(pathObj.path).to.equal('/');
      expect(commitAction).to.equal('setIsProcessing');
      expect(commitPayload).to.be.true;
      done();
    }, 500);
  });

  it('test okClicked error', async() => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({invalidName: false, error: false, message: ''});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.true;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal(INVALID_FIELD_VALUE);
  });

  it('test okClicked no error', async() => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let mockRepo = {
      sourceData: {
        name: 'name',
        owner: {
          name: 'owner'
        },
        repositoryUrl: 'url'
      },
      codehubData: {
        source: 'source',
        badges: {
          status: 'status'
        }
      }
    }
    let mockData = MOCK_CATEGORIES;
    mockData[0].selected = true;
    wrapper.setData({newRepo: mockRepo, repoCategories: mockData });
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidOwner).to.be.false;
    expect(wrapper.vm.invalidUrl).to.be.false;
    expect(wrapper.vm.invalidSource).to.be.false;
    expect(wrapper.vm.invalidStatus).to.be.false;
    expect(wrapper.vm.invalidCategories).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('addRepo');
    expect(dispatchPayload.id).to.equal('Add');
  });

  it('test urlChanged invalid', async() => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let mockRepo = {
      sourceData: {
        repositoryUrl: 'Invalid URL'
      }
    };
    wrapper.setData({newRepo: mockRepo});
    wrapper.vm.urlChanged();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidUrl).to.be.true;
    expect(wrapper.vm.newRepo.name).to.be.null;
    expect(wrapper.vm.newRepo.owner).to.be.null;
  });

  it('test urlChanged valid', async() => {
    const wrapper = shallowMount(Add, { attachTo: document.body, mocks: { $store, $router }});
    let mockRepo = {
      sourceData: {
        repositoryUrl: 'https://github.com/usdot-jpo-codehub/codehub-ui'
      }
    };
    wrapper.setData({newRepo: mockRepo});
    wrapper.vm.urlChanged();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidUrl).to.be.false;
    expect(wrapper.vm.newRepo.sourceData.name).to.equal('codehub-ui');
    expect(wrapper.vm.newRepo.sourceData.owner.name).to.equal('usdot-jpo-codehub');
  });

});
