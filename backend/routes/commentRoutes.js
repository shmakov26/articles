const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/all', commentController.getComments);
router.get('/:commentId', commentController.getCommentById);
router.patch('/:commentId', commentController.updateCommentById);
router.delete('/:commentId', commentController.deleteCommentById);

module.exports = router;