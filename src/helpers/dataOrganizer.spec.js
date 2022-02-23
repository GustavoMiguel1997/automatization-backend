const { getAllCategoties } = require('./dataOrganizer');

describe('getAllCategoties', () => {
  it('should return an array of all keys of each object in array', () => {
    const obj = [{ key1: 'value-1', key2: 'value-2' }];
    const result = getAllCategoties(obj);
    expect(result).toEqual(['key1', 'key2']);
  });
});
