import {shallowMount} from '@vue/test-utils';
import CHCategoryImageSelector from '@/components/ch-category-image-selector.vue';
import { expect } from 'chai';

describe('components/ch-category-image-selector.vue', () => {
  let mockProps;
  let callbackAction;
  let callbackPayload;

  beforeEach(() => {
    mockProps = {
      data: {
        image: 'path/image.jpg'
      },
      callback: function(action, payload) {
        callbackAction = action;
        callbackPayload = payload;
      }
    };
  });

  it('test imageSelected', () => {
    const wrapper = shallowMount(CHCategoryImageSelector, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    wrapper.setData({selectedImage: null});
    wrapper.vm.imageSelected({image: 'image.jpg'});
    expect(wrapper.vm.selectedImage).to.equal('image.jpg');
  });

  it('test imagePicked', async() => {
    const wrapper = shallowMount(CHCategoryImageSelector, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    let mockData = {imageFileName: null};
    wrapper.setData({selectedCategory: mockData, selectedImage: 'image.jpg', showImages: true});
    await wrapper.vm.$nextTick();
    wrapper.vm.imagePicked();
    expect(wrapper.vm.selectedCategory.imageFileName).to.equal('image.jpg');
    expect(wrapper.vm.showImages).to.be.false;
  });

  it('test selectClicked', () => {
    const wrapper = shallowMount(CHCategoryImageSelector, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    wrapper.setData({selectedImage: 'image.jpg'});
    wrapper.vm.selectClicked();
    expect(callbackAction).to.equal('ok');
    expect(callbackPayload).to.equal('image.jpg');
  });

  it('test selectClicked no selectedImage', () => {
    callbackAction = undefined;
    callbackPayload = undefined;
    const wrapper = shallowMount(CHCategoryImageSelector, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    wrapper.setData({selectedImage: null});
    wrapper.vm.selectClicked();
    expect(callbackAction).to.be.undefined;
    expect(callbackPayload).to.be.undefined;
  });

  it('test cancelClicked', () => {
    const wrapper = shallowMount(CHCategoryImageSelector, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    wrapper.vm.cancelClicked();
    expect(callbackAction).to.equal('cancel');
    expect(callbackPayload).to.be.null;
  });

});
