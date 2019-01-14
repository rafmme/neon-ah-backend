import { expect } from 'chai';


describe('set up unit test', () => {
  it('Sample test', () => {
    expect(true).to.equal(true);
  });
  it('Should return neon', () => {
    const team = 'neon';
    expect(team).to.equal('neon');
  });
});
