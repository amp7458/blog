const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Middleware to ensure user is logged in
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

// Display all posts
router.get('/', async (req, res) => {
  const order = req.query.order === 'desc' ? 'desc' : 'asc';
  const posts = await Post.find().sort({ createdAt: order });
  res.render('index', { posts, user: req.user, messages: req.flash() });
});

// Create a new post
router.post('/', isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, username: req.user.username });
  await post.save();
  res.redirect('/posts');
});

// View a single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.render('post', { post, user: req.user });
  } else {
    res.redirect('/posts');
  }
});

// Delete a post
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/posts');
});

module.exports = router;
