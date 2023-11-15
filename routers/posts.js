const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const multer = require('multer');

// index
router.get('/', postsController.index);

// store 
router.post('/', multer({ dest: 'public/imgs/posts' }).single('image'), express.urlencoded({ extended: true }), postsController.store);

// show
router.get('/:slug', postsController.show);

// download
router.get('/:slug/download', postsController.download);

// destroy
router.delete('/:slug', postsController.destroy);

module.exports = router;
