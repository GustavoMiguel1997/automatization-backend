const {
  getAllCategoties,
  validateValueField,
  validateCategory,
} = require('../../helpers/dataOrganizer');
const {
  getFile,
  transformXslxIntoJson,
  removeFiles,
} = require('../../helpers/fileHelpers');

const uploadController = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.forbiddenExtension || !req.file) {
    res.status(500);
    return res.send({
      ok: false,
      message: req.forbiddenExtension || 'Não contém arquivo',
    });
  }

  removeFiles();

  /*  mandar essas strings para outro arquivo para manter isso */
  const defaultCategory = 'Plano de Contas';
  const defaultValueField = 'Valor';

  const file = getFile();
  const data = transformXslxIntoJson(file);
  const categories = getAllCategoties(data);

  const defaultCategoryValidated = validateCategory(
    categories,
    defaultCategory
  );

  const defaultValueFieldValidated = validateValueField(
    data,
    defaultValueField
  );

  res.status(200);
  return res.json({
    ok: true,
    message: 'Upload realizado com sucesso',
    categories,
    defaultCategory: defaultCategoryValidated,
    defaultValueField: defaultValueFieldValidated,
  });
};

module.exports = uploadController;
