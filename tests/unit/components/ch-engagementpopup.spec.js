import {shallowMount} from '@vue/test-utils';
import CHEngagementPopup from '@/components/ch-engagementpopup.vue';
import { expect } from 'chai';

describe('components/ch-engagementpopup.vue', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      data: {
        controlsColor: null,
        controlsShadow: null
      },
      callback: function() {
      },
      hideControls: false
    };
  });

  it('test getColorClass', () => {
    mockProps.data.controlsColor = 'red';
    const wrapper = shallowMount(CHEngagementPopup, { attachTo: document.body, propsData: { data: mockProps.data, hideControls: mockProps.hideControls, actionCallback: mockProps.callback }});
    let result = wrapper.vm.getColorClass;
    expect(result).to.equal('ch-engpop-color-red');
  });

  it('test getColorClass default', () => {
    mockProps.data.controlsColor = null;
    const wrapper = shallowMount(CHEngagementPopup, { attachTo: document.body, propsData: { data: mockProps.data, hideControls: mockProps.hideControls, actionCallback: mockProps.callback }});
    let result = wrapper.vm.getColorClass;
    expect(result).to.equal('ch-engpop-color-black');
  });

  it('test getShadowClass', () => {
    mockProps.data.controlsShadow = 'red';
    const wrapper = shallowMount(CHEngagementPopup, { attachTo: document.body, propsData: { data: mockProps.data, hideControls: mockProps.hideControls, actionCallback: mockProps.callback }});
    let result = wrapper.vm.getShadowClass;
    expect(result).to.equal('ch-engpop-shadow-red');
  });

  it('test getShadowClass default', () => {
    mockProps.data.controlsShadow = null;
    const wrapper = shallowMount(CHEngagementPopup, { attachTo: document.body, propsData: { data: mockProps.data, hideControls: mockProps.hideControls, actionCallback: mockProps.callback }});
    let result = wrapper.vm.getShadowClass;
    expect(result).to.equal('ch-engpop-shadow-white');
  });


});
