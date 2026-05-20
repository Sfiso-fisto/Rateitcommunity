const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', 'username avatar')
      .populate('following', 'username avatar');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user posts
router.get('/:userId/posts', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments({ author: req.params.userId });
    res.json({ posts, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Follow user
router.post('/:userId/follow', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user.followers.includes(req.user.id)) {
      user.followers.push(req.user.id);
      await user.save();
    }

    const currentUser = await User.findById(req.user.id);
    if (!currentUser.following.includes(req.params.userId)) {
      currentUser.following.push(req.params.userId);
      await currentUser.save();
    }

    res.json({ message: 'Following user' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unfollow user
router.post('/:userId/unfollow', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.followers = user.followers.filter(id => id.toString() !== req.user.id);
    await user.save();

    const currentUser = await User.findById(req.user.id);
    currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.userId);
    await currentUser.save();

    res.json({ message: 'Unfollowed user' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { avatar, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar, bio },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
