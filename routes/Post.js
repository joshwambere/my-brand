const express = require("express");
const checkToken = require("../middleware/checkToken");
const checkAdmin = require("../middleware/checkAdmin");
const router = express.Router();
const Posts = require("../controllers/posts");
const { route } = require("../routes");
const newPost = new Posts();
/**
* @swagger
*  /api/posts:
*    get:
*      description: use get request to get all the article available in DB
*      responses:
*        200:
*         description: successful request
*/
router.get("/posts", newPost.getAllPost);

/**
* @swagger
*  /api/posts:
*    post:
*      
*      parameters:
*       - in: body
*         name: body
*       - in: header
*         name: authorization
*         
*      description: use post request to add a new article
*      responses:
*        201:
*         description: post added
*/
router.post("/posts", checkToken, checkAdmin, newPost.addPost);

//find one post
router.get("/posts/:id", newPost.findOnePost);

router.patch("/posts/:id", checkToken, checkAdmin, newPost.updatePost);

//delete post
router.delete("/posts/:id", checkToken, checkAdmin, newPost.deletePost);

module.exports = router;
