const mimetypes = [
  'text/csv',
  'application/vnd.ms-excel',
  'pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

function validateExtesions(extension) {
  if (mimetypes.includes(extension)) return true;
}

module.exports = validateExtesions;
