const express = require("express");
const checkToken = require("../middleware/checkToken");
const checkAdmin = require("../middleware/checkAdmin");
const router = express.Router();
const Posts = require('../controllers/posts');
const { route } = require("../routes");
const newPost = new Posts();
//get all posts
router.get('/posts', newPost.getAllPost);
//add one post
router.post('/posts', checkToken, checkAdmin, newPost.addPost);

//find one post
router.get('/posts/:id', newPost.findOnePost);

router.patch('/posts/:id', checkToken, checkAdmin, newPost.updatePost);

//delete post
router.delete('/posts/:id', checkToken, checkAdmin, newPost.deletePost);

module.exports = router;