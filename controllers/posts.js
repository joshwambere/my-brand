const Post = require('../models/Post');

class MyPosts {
    async getAllPost(req, res) {
        const posts = await Post.find();
        res.send(posts);
    }
    async addPost(req,  res) {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            img: req.body.image,
            date: new Date(),
          });
          await post.save();
          res.send(post);
    }
    async findOnePost(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id });
            if (post) {
              res.send(post);
            } else {
              res.status(404);
              res.send({ error: "Post doesn't exist!" });
            }
          } catch (error) {
            res.status(404);
            res.console({ error: error.message });
          }
    }
    async updatePost(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id });
        
            if (req.body.title) {
              post.title = req.body.title;
            }
        
            if (req.body.content) {
              post.content = req.body.content;
            }
            if (req.body.image) {
              post.img = req.body.image;
            }
            post.date = new Date();
        
            await post.save();
            res.send(post);
          } catch {
            res.status(404);
            res.send({ error: "Post doesn't exist!" });
          }
    }
    async deletePost(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id });
            if (post) {
              await Post.deleteOne({ _id: req.params.id });
              res.status(204).send();
            } else {
              res.status(404);
              res.send({ error: "Post doesn't exist!" });
            }
          } catch (error) {
            res.status(404);
            res.send({ error: "Post doesn't exist!" });
          }
    }
}
module.exports = MyPosts;
