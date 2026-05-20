const express = require('express');
const Rating = require('../models/Rating');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Submit rating
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { postId, score, comment } = req.body;

    if (score < 1 || score > 100) return res.status(400).json({ error: 'Score must be 1-100' });

    let rating = await Rating.findOne({ post: postId, user: req.user.id });
    if (rating) {
      rating.score = score;
      rating.comment = comment;
    } else {
      rating = new Rating({ post: postId, user: req.user.id, score, comment });
    }
    await rating.save();

    // Update post average
    const ratings = await Rating.find({ post: postId });
    const avgScore = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
    await Post.findByIdAndUpdate(postId, {
      averageRating: Math.round(avgScore),
      totalRatings: ratings.length
    });

    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get ratings for post
router.get('/post/:postId', async (req, res) => {
  try {
    const ratings = await Rating.find({ post: req.params.postId })
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete rating
router.delete('/:ratingId', authMiddleware, async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.ratingId);
    if (rating.user.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    const postId = rating.post;
    await Rating.findByIdAndDelete(req.params.ratingId);

    // Update post average
    const ratings = await Rating.find({ post: postId });
    if (ratings.length > 0) {
      const avgScore = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
      await Post.findByIdAndUpdate(postId, {
        averageRating: Math.round(avgScore),
        totalRatings: ratings.length
      });
    } else {
      await Post.findByIdAndUpdate(postId, { averageRating: 0, totalRatings: 0 });
    }

    res.json({ message: 'Rating deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
