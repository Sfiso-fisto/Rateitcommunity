const express = require('express');

const router = express.Router();

const categories = [
  { id: 'car', label: 'Rate My Car', emoji: '🚗', color: '#FF4D4D', desc: 'Show off your ride' },
  { id: 'business', label: 'Rate My Business', emoji: '🏢', color: '#FF8C00', desc: 'Get real feedback' },
  { id: 'brand', label: 'Rate My Brand', emoji: '⚡', color: '#FFD700', desc: 'Logo, vibe, identity' },
  { id: 'parenting', label: 'Rate My Parenting', emoji: '👶', color: '#00E5A0', desc: 'Honest community takes' },
  { id: 'shoe', label: 'Rate My Shoe', emoji: '👟', color: '#00BFFF', desc: 'Heat or L?' },
  { id: 'art', label: 'Rate My Art', emoji: '🎨', color: '#BF5FFF', desc: 'Raw creativity judged' },
  { id: 'movie', label: 'Rate a Movie', emoji: '🎬', color: '#FF69B4', desc: 'Your takes, ranked' },
];

router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:categoryId', (req, res) => {
  const category = categories.find(c => c.id === req.params.categoryId);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json(category);
});

module.exports = router;
