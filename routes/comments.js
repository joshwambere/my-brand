const express = require('express');
const checkToken = require('../middleware/checkToken');
const Comments = require('../controllers/comments');
const router = express.Router();
const newComment = new Comments();

//add comments
router.post('/comments', checkToken, newComment.addComment);
router.get('/comments', newComment.getComments);
router.get('/comments/onpost', newComment.getCommentsByPost);
module.exports = router;