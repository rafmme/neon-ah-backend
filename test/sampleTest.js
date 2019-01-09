import { expect } from 'chai';
import server from '../index';

describe('set up unit test', () => {
  it('Sample test', () => {
    expect(true).to.equal(true);
  });
  it('Should return neon', () => {
    const team = 'neon';
    expect(team).to.equal('neon');
  });
});
