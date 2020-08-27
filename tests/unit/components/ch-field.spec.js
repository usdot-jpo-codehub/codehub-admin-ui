import {shallowMount} from '@vue/test-utils';
import CHField from '@/components/ch-field.vue';
import { expect } from 'chai';

describe('components/ch-field.vue', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      label: null,
      value: null,
      size: null,
      weight: null,
      color: null,
      link: null,
      shadow: null,
      time: null
    };
  });

  it('test isTime', () => {
    mockProps.time = 'true'
    const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
    let result = wrapper.vm.isTime;
    expect(result).to.be.true;
  });

  it('test islink', () => {
    mockProps.link = 'true'
    const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
    let result = wrapper.vm.islink;
    expect(result).to.be.true;
  });

  it('shadowClass', () => {
    mockProps.shadow = 'true'
    const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
    let result = wrapper.vm.shadowClass;
    expect(result).to.equal('ch-field--value-shadow');
  });

  it('shadowClass empty', () => {
    mockProps.shadow = null
    const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
    let result = wrapper.vm.shadowClass;
    expect(result).to.equal('');
  });

  it('test sizeClass', () => {
    let sizes = ['smaller', 'small', 'large', 'medium'];
    for(let i=0; i<sizes.length; i++) {
      mockProps.size = sizes[i];
      const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
      let result = wrapper.vm.sizeClass;
      expect(result).to.equal(`ch-field--value-${sizes[i]}`);
    }
  });

  it('test weightClass', () => {
    mockProps.weight = 'bold'
    const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
    let result = wrapper.vm.weightClass;
    expect(result).to.equal('ch-field--value-bold');
  });

  it('test weightClass default', () => {
    mockProps.weight = null
    const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
    let result = wrapper.vm.weightClass;
    expect(result).to.equal('ch-field--value-normal');
  });

  it('test colorClass', () => {
    let colors = ['blue', 'green', 'navy', 'gray', 'lightgray', 'red', 'black'];
    for(let i=0; i<colors.length; i++) {
      mockProps.color = colors[i];
      const wrapper = shallowMount(CHField, { attachTo: document.body, propsData: mockProps });
      let result = wrapper.vm.colorClass;
      expect(result).to.equal(`ch-field--value-${colors[i]}`);
    }
  });

});
