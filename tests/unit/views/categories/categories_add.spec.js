import {shallowMount} from '@vue/test-utils';
import CategoriesAdd from '@/views/categories/categories_add.vue';
import { expect } from 'chai';

describe('categories/categories_add.vue', () => {
  let $store;
  let $router;
  let dispatchMethod;
  let dispatchPayload;
  let pathObj;
  let mockCategory;

  beforeEach(() => {
    $router = {
      push: function(obj){
        pathObj = obj;
      }
    };

    $store = {
      state: {
        processing_error: false,
        categoryImages: []
      },
      dispatch: function(method, payload){
        dispatchMethod = method;
        dispatchPayload = payload;
      },
      commit: function() {
      }
    }
    mockCategory = {
      name: "name",
      isEnabled: true,
      description: "description",
      isPopular: false,
      orderPopular: null,
      imageFileName: 'http://imagelink/image.jpg'
    }
  });

  it('test cancel clicked', () => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/categories');
  });

  it('test okClicked no error', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({newCategory: mockCategory});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidOrder).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('addCategory');
    expect(dispatchPayload.id).to.equal('AddCategory');
  });

  it('test okClicked no error featured', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.isPopular = true;
    mockCategory.orderPopular = 10;
    wrapper.setData({newCategory: mockCategory});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidOrder).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('addCategory');
    expect(dispatchPayload.id).to.equal('AddCategory');
  });

  it('test okClicked error no name', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.name = '';
    wrapper.setData({newCategory: mockCategory});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.true;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.');
  });

  it('test okClicked error invalid order', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.isPopular = true;
    mockCategory.orderPopular = '';
    wrapper.setData({newCategory: mockCategory});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidOrder).to.be.true;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.');
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(wrapper.vm.message).to.equal('Done!');
      expect(pathObj.path).to.equal('/categories');
      done();
    }, 500);

  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

  it('test imageOnError', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    let mockEvent = {
      target: {
        src: ''
      }
    };
    wrapper.vm.imageOnError(mockEvent);
    await wrapper.vm.$nextTick();
    expect(mockEvent.target.src).to.equal('/img/unknown.svg');
  });

  it('test selectImage no popular', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.isPopular = false;
    wrapper.setData({newCategory: mockCategory});
    wrapper.vm.selectImage();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });

  it('test selectImage popular', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.isPopular = true;
    mockCategory.orderPopular = 10;
    wrapper.setData({newCategory: mockCategory});
    wrapper.vm.selectImage();
    await wrapper.vm.$nextTick();
    expect(dispatchMethod).to.equal('fetchCategoryImages');
    expect(wrapper.vm.showImages).to.be.true;
  });

  it('test isPopularChanged', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.isPopular = false;
    mockCategory.orderPopular = null;
    wrapper.setData({newCategory: mockCategory, showImages: true});
    wrapper.vm.isPopularChanged();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });

  it('test isPopularChanged false', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    mockCategory.isPopular = true;
    mockCategory.orderPopular = 10;
    wrapper.setData({newCategory: mockCategory, showImages: true});
    wrapper.vm.isPopularChanged();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.true;
  });

  it('test imageSelectorAction invalid action', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({newCategory: mockCategory, showImages: true});
    let data = 'image.jpg';
    wrapper.vm.imageSelectorAction('other than ok', data);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });
  it('test imageSelectorAction no data', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({newCategory: mockCategory, showImages: true});
    let data = null;
    wrapper.vm.imageSelectorAction('ok', data);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });
  it('test imageSelectorAction ok', async() => {
    const wrapper = shallowMount(CategoriesAdd, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({newCategory: mockCategory, showImages: true});
    let data = 'image.jpg';
    wrapper.vm.imageSelectorAction('ok', data);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
    expect(wrapper.vm.newCategory.imageFileName).to.equal(data);
  });


});
