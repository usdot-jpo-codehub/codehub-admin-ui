import CHMixin from '@/mixins/ch-mixin.js';
import { expect } from 'chai';

describe('ch-mixin.js', function() {

  it('test getColors ', function() {
    let result = CHMixin.methods.getColors();
    expect(result).to.not.be.null;
    expect(result.length).to.be.greaterThan(0)
    expect(result[0].color).to.equal('white');
  });

  it('test getEngPopColorClass invalid colorValue', () => {
    let result = CHMixin.methods.getEngPopColorClass(null);
    expect(result).to.equal('ch-engpop-color-black');
  });
  it('test getEngPopColorClass default', () => {
    let result = CHMixin.methods.getEngPopColorClass('color not found');
    expect(result).to.equal('ch-engpop-color-black');
  });
  it('test getEngPopColorClass supported color', () => {
    let colors = ['white', 'black','navy', 'gray', 'darkgray', 'green', 'red', 'darkred', 'blue', 'orange'];
    for(let i=0; i<colors.length;i++) {
      let result = CHMixin.methods.getEngPopColorClass(colors[i]);
      expect(result).to.equal(`ch-engpop-color-${colors[i]}`);
    }
  });

  it('test getEngPopShadowClass invalid colorValue', () => {
    let result = CHMixin.methods.getEngPopShadowClass(null);
    expect(result).to.equal('ch-engpop-shadow-white');
  });
  it('test getEngPopShadowClass default', () => {
    let result = CHMixin.methods.getEngPopShadowClass('color not found');
    expect(result).to.equal('ch-engpop-shadow-white');
  });
  it('test getEngPopShadowClass supported color', () => {
    let colors = ['white', 'black','navy', 'gray', 'darkgray', 'green', 'red', 'darkred', 'blue', 'orange'];
    for(let i=0; i<colors.length;i++) {
      let result = CHMixin.methods.getEngPopShadowClass(colors[i]);
      expect(result).to.equal(`ch-engpop-shadow-${colors[i]}`);
    }
  });

});
