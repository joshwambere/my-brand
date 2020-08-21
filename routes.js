const express = require('express');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/Post');
const commentRoute = require('./routes/comments');
const contactRoute = require('./routes/sendMsg');

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', postRoutes);
router.use('/api', commentRoute);
router.use('/api', contactRoute);

module.exports = router;