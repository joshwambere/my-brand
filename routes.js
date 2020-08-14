const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('./models/Post');
const User = require('./models/User');
const checkToken = require('./middleware/checkToken');
const checkAdmin = require('./middleware/checkAdmin');
const router = express.Router();

router.post('/users', async (req, res) => {
  const user = new User({
    email: 'hello2@gmail.com',
    password: 'password2',
    isadmin: true,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
});

router.post('/users/signin', async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) {
    if (userFound.password === req.body.password) {
      const data = {
        email: userFound.email,
        isadmin: userFound.isadmin,
      };
      const token = jwt.sign(data, 'johnson', { expiresIn: '1h' });
      return res.status(200).json({
        status: 200,
        message: 'User signed in successfully',
        data: userFound,
        token: token,
      });
    } else {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect email/password',
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Incorrect email/password',
    });
  }
});

//get all post
router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});
//add one post
router.post('/posts', checkToken, checkAdmin, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    img: req.body.image,
    date: new Date(),
  });
  await post.save();
  res.send(post);
});

//find one post
router.get('/posts/:id', async (req, res) => {
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
});

router.patch('/posts/:id', checkToken, checkAdmin, async (req, res) => {
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
});

//delete post
router.delete('/posts/:id', checkToken, checkAdmin, async (req, res) => {
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
});

module.exports = router;
