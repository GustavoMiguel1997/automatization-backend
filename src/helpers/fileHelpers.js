const path = require('path');
const xlsx = require('xlsx');
const AdmZip = require('adm-zip');
const fs = require('fs');

function getFile(extension = 'xls') {
  return path.join(__dirname, `../public/upload/file.${extension}`);
}

function transformXslxIntoJson(file) {
  const workbook = xlsx.readFile(file);
  const sheet_name_list = workbook.SheetNames;
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
}

function formatName(name) {
  return name.replace('/', '-');
}

function generateFile(data, fileName) {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Responses');
  xlsx.writeFile(wb, path.join(__dirname, `../public/files/${fileName}.xls`));
}

function compressFiles() {
  try {
    const zip = new AdmZip();
    const outputFile = path.join(__dirname, `../public/files.zip`);
    zip.addLocalFolder(path.join(__dirname, `../public/files`));
    zip.writeZip(outputFile);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

async function removeFiles() {
  const directory = getFilePath('../public/files');
  if (fs.existsSync(getFilePath('../public/files.zip'))) {
    fs.unlinkSync(getFilePath('../public/files.zip'));
  }

  if (fs.existsSync(directory)) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }
}

function getFilePath(currentPath) {
  return path.join(__dirname, currentPath);
}

function generateAllFiles(completeData, category) {
  completeData.map((item) => {
    const categoryName =
      category === null ? 'SEM CATEGORIA' : formatName(item[0][category]);
    generateFile(item, categoryName);
  });
}

function getZipFile() {
  return path.join(__dirname, `../public/files.zip`);
}

module.exports = {
  getFile,
  getZipFile,
  formatName,
  transformXslxIntoJson,
  generateFile,
  generateAllFiles,
  compressFiles,
  removeFiles,
};
