const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const uploadController = require('../controllers/uploadFile');
const getFileController = require('../controllers/getFiles');

router.get('/getFiles', getFileController);
router.post('/upload', uploadMiddleware.single('file'), uploadController);

module.exports = router;
