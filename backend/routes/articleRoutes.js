const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/', articleController.createArticle);
router.get('/all', articleController.getArticles);
router.get('/:id', articleController.getArticleById);
router.patch('/:id', articleController.updateArticleById);
router.delete('/:id', articleController.deleteArticleById);

module.exports = router;