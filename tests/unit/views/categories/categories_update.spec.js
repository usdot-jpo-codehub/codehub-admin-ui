import {shallowMount} from '@vue/test-utils';
import CategoriesUpdate from '@/views/categories/categories_update.vue';
import { expect } from 'chai';

describe('Categories/categories_update.vue', () => {
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
        selected_category: {
          id: 'id',
          name: 'name',
          description: 'description',
          isPopular: false,
          orderPopular: null,
          imageFileName:'image.jpg'
        },
        categoryImages: [{id:"id",image:"image.jpg"}]
      },
      dispatch: function(method, payload){
        dispatchMethod = method;
        dispatchPayload = payload;
      },
      commit: function() {
      }
    }
  });

  it('test categoryImages', () => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let data = wrapper.vm.categoryImages
    expect(data[0].id).to.equal($store.state.categoryImages[0].id);
  });

  it('test cancel clicked', () => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.cancelClicked();
    expect(pathObj.path).to.equal('/categories');
  });

  it('test okClicked no error', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.setData({selectedCategory: $store.state.selected_category});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidOrder).to.be.false;
    expect(wrapper.vm.error).to.be.false;
    expect(dispatchMethod).to.equal('updateCategory');
    expect(dispatchPayload.id).to.equal('UpdateCategory');
  });

  it('test okClicked error', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockData = $store.state.selected_category;
    mockData.name='';
    wrapper.setData({selectedCategory: mockData});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.true;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.');
  });

  it('test okClicked error is popular with no order', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockData = $store.state.selected_category;
    mockData.name='name';
    mockData.isPopular=true;
    mockData.orderPopular=null;
    wrapper.setData({selectedCategory: mockData});
    wrapper.vm.okClicked();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.invalidName).to.be.false;
    expect(wrapper.vm.invalidOrder).to.be.true;
    expect(wrapper.vm.error).to.be.true;
    expect(wrapper.vm.message).to.equal('Invalid field value.');
  });

  it('test closeView', (done) => {
    $store.state.processing_error = false;
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    setTimeout(() => {
      expect(wrapper.vm.message).to.equal('Done!');
      expect(pathObj.path).to.equal('/categories');
      done();
    }, 500);

  });

  it('test closeView processing error', () => {
    $store.state.processing_error = true;
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    wrapper.vm.closeView();
    expect(wrapper.vm.message).to.not.equal('Done!');
  });

  it('test imageOnError', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
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
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    mockCategory.isPopular = false;
    wrapper.setData({selectedCategory: mockCategory, showImages: false});
    wrapper.vm.selectImage();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });

  it('test selectImage popular', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    mockCategory.isPopular = true;
    mockCategory.orderPopular = 10;
    wrapper.setData({selectedCategory: mockCategory, showImages: false});
    wrapper.vm.selectImage();
    await wrapper.vm.$nextTick();
    expect(dispatchMethod).to.equal('fetchCategoryImages');
    expect(wrapper.vm.showImages).to.be.true;
  });

  it('test isPopularChanged', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    mockCategory.isPopular = false;
    wrapper.setData({selectedCategory: mockCategory, showImages: true});
    wrapper.vm.isPopularChanged();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });

  it('test isPopularChanged false', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    mockCategory.isPopular = true;
    wrapper.setData({selectedCategory: mockCategory, showImages: true});
    wrapper.vm.isPopularChanged();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.true;
  });

  it('test imageSelectorAction invalid action', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    wrapper.setData({selectedCategory: mockCategory, showImages: true});
    let data = 'image.jpg';
    wrapper.vm.imageSelectorAction('other than ok', data);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });
  it('test imageSelectorAction no data', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    wrapper.setData({selectedCategory: mockCategory, showImages: true});
    let data = null;
    wrapper.vm.imageSelectorAction('ok', data);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
  });
  it('test imageSelectorAction ok', async() => {
    const wrapper = shallowMount(CategoriesUpdate, { attachTo: document.body, mocks: { $store, $router }});
    let mockCategory = $store.state.selected_category;
    wrapper.setData({selectedCategory: mockCategory, showImages: true});
    let data = 'image.jpg';
    wrapper.vm.imageSelectorAction('ok', data);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showImages).to.be.false;
    expect(wrapper.vm.selectedCategory.imageFileName).to.equal(data);
  });


});
