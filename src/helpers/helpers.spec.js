const { formatString, validateNumber } = require('./helpers');

describe('formatString', () => {
  it('should return string in lowercase without assents', () => {
    const result = formatString('áÀsúuãçÇçWÃqeà');
    expect(result).toEqual('aasuuacccwaqea');
  });
});

describe('validateNumber', () => {
  it('should return number when is decimal with comma inside string', () => {
    const result = validateNumber('5,5');
    expect(result).toEqual(5.5);
  });

  it('should return number when is decimal with point inside string', () => {
    const result = validateNumber('5.5');
    expect(result).toEqual(5.5);
  });

  it('should return number when is number', () => {
    const result = validateNumber(5.5);
    expect(result).toEqual(5.5);
  });

  it('should return number when is real format', () => {
    const result = validateNumber('1.000,5');
    expect(result).toEqual(1000.5);
  });

  it('should return null when has letters', () => {
    const result = validateNumber('5a');
    expect(result).toBeNull();
  });
});
