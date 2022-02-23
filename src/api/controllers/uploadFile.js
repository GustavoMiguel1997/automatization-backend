const { getAllCategoties } = require('../../helpers/dataOrganizer');
const {
  getFile,
  transformXslxIntoJson,
  removeFiles,
} = require('../../helpers/fileHelpers');

const uploadController = (req, res) => {
  console.log('UPLOAD ROUTER');

  res.setHeader('Content-Type', 'application/json');

  if (req.forbiddenExtension || !req.file) {
    res.status(500);
    return res.send({
      ok: false,
      message: req.forbiddenExtension || 'Não contém arquivo',
    });
  }

  removeFiles();

  const file = getFile();
  const data = transformXslxIntoJson(file);
  const categories = getAllCategoties(data);

  res.status(200);
  return res.json({
    ok: true,
    message: 'Upload realizado com sucesso',
    categories,
  });
};

module.exports = uploadController;
