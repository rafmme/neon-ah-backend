import { expect } from 'chai';
import { MockStrategy } from '../../helpers/MockStrategy';

describe('MockStrategy Utility Class', () => {
  it('should throw an error if instantiated with an empty strategy name', (done) => {
    const createMockStrategy = () => new MockStrategy('', () => {});
    expect(createMockStrategy).to.throw(TypeError);
    done();
  });

  it('should throw an error if instantiated without a strategy name', (done) => {
    const createMockStrategy = () => new MockStrategy(null, () => {});
    expect(createMockStrategy).to.throw(TypeError);
    done();
  });
});
