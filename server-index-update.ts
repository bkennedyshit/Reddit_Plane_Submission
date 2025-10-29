// Add these endpoints to your server/index.ts file

// Get play count
router.get('/api/play-count', async (_req, res) => {
  try {
    const count = await redis.get('play-count');
    res.json({ count: count ? parseInt(count) : 0 });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Failed to get play count' });
  }
});

// Increment play count
router.post('/api/increment-plays', async (_req, res) => {
  try {
    const count = await redis.incrBy('play-count', 1);
    res.json({ count });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Failed to increment plays' });
  }
});
