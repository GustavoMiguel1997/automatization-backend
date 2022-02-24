function formatString(string) {
  return String(string)
    .trim()
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function validateNumber(number) {
  const stringNumber = String(number);
  const formatedNumber =
    stringNumber.includes(',') && stringNumber.includes('.')
      ? Number(stringNumber.replace('.', '').replace(',', '.'))
      : Number(stringNumber.replace(',', '.'));
  if (!isNaN(formatedNumber)) {
    return formatedNumber;
  }
  return null;
}

module.exports = { formatString, validateNumber };
