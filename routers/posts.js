const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const multer = require('multer');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');

// index
router.get('/', postsController.index);

// store 
router.post('/', auth, multer({ dest: 'public/imgs/posts' }).single('image'), postsController.store);

// show
router.get('/:slug', postsController.show);

// download
router.get('/:slug/download', postsController.download);

// destroy
router.delete('/:slug', postsController.destroy);

module.exports = router;
