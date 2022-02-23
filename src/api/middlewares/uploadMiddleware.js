const path = require('path');
const multer = require('multer');
const validateExtesions = require('../../helpers/extensionValidator');
const { validateFoldersExists } = require('../../helpers/fileHelpers');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/upload'));
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.')[1];
    cb(null, `file.${fileExtension}`);
  },
});

const uploadMiddleware = {
  validateFolders: (req, res, next) => {
    validateFoldersExists();
    next();
  },
  multer: multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (validateExtesions(file.mimetype)) {
        return cb(null, true);
      } else {
        req.forbiddenExtension = 'Extensão do arquivo inválida ';
        return cb(null, false, req.fileValidationError);
      }
    },
  }),
};

module.exports = uploadMiddleware;
