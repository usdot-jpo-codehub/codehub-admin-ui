import {shallowMount} from '@vue/test-utils';
import CHCategoryImage from '@/components/ch-category-image.vue';
import { expect } from 'chai';

describe('components/ch-category-image.vue', () => {
  let mockProps;
  let callbackData;

  beforeEach(() => {
    mockProps = {
      data: {
        image: 'path/image.jpg'
      },
      callback: function(obj) {
        callbackData = obj;
      }
    }
  });

  it('test imagename', () => {
    const wrapper = shallowMount(CHCategoryImage, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    let result = wrapper.vm.imageName;
    expect(result).to.equal('image.jpg');
  });

  it('test imageClicked', () => {
    const wrapper = shallowMount(CHCategoryImage, { attachTo: document.body, propsData: { data: mockProps.data, cb: mockProps.callback }});
    wrapper.vm.imageClicked();
    expect(callbackData).to.equal(mockProps.data);
  });

});
