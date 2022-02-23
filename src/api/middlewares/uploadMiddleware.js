const path = require('path');
const multer = require('multer');
const validateExtesions = require('../../helpers/extensionValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('antes do destination');
    cb(null, path.join(__dirname, '../../public/upload'));
    console.log('depois do destination');
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.')[1];
    cb(null, `file.${fileExtension}`);
  },
});

const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (validateExtesions(file.mimetype)) {
      return cb(null, true);
    } else {
      req.forbiddenExtension = 'Extensão do arquivo inválida ';
      return cb(null, false, req.fileValidationError);
    }
  },
});

module.exports = uploadMiddleware;
