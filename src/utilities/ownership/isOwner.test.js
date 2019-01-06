import isOwner from './isOwner';

describe('should check for ownership', () => {
  it('should return owner ', () => {
    const owner = isOwner('anasey', 'anasey');

    expect(owner).toBe('owner');
  });

  it('should return not owner ', () => {
    const owner = isOwner('anasey', 'pappymas');

    expect(owner).toBe('not owner');
  });
});
