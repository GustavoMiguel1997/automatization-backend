const fs = require('fs');
const { getDataOrganized } = require('../../helpers/dataOrganizer');
const {
  getFile,
  getZipFile,
  generateFile,
  generateAllFiles,
  transformXslxIntoJson,
  compressFiles,
} = require('../../helpers/fileHelpers');

const getFiles = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const category = 'Plano de Contas';
  const file = getFile();
  const data = transformXslxIntoJson(file);

  const { dataWithCategory, dataWithoutCategory, totalOfEachCategory } =
    getDataOrganized(data, category);

  if (dataWithCategory.length > 0) {
    generateAllFiles(dataWithCategory, category);
  }

  if (dataWithoutCategory.length > 0) {
    generateAllFiles(dataWithoutCategory, null);
  }

  if (totalOfEachCategory.length > 0) {
    generateFile(totalOfEachCategory, 'TODOS');
  }

  compressFiles();

  const readStream = fs.createReadStream(getZipFile());
  readStream.on('close', () => res.end());
  readStream.pipe(res);
};

module.exports = getFiles;
