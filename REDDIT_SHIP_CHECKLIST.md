# Reddit Ship Checklist - What's Left

## ✅ GAME COMPLETE (95%)
- [x] Flight mechanics
- [x] Obstacles (boxes, buildings, rings, cranes)
- [x] Collision detection
- [x] Scoring system
- [x] Lives/game over
- [x] Visual effects
- [x] Road/background
- [x] Speed boost (D key)
- [x] Tricks (barrel roll, Q/E)
- [x] Combo multiplier
- [x] Plane sprite (bigger now - 32x32)
- [x] Addicting gameplay ✨

## 🚀 TO SHIP TO REDDIT (5-8 hours)

### 1. Install Devvit Package (30 min)
```bash
npm install @devvit/public-api @devvit/kit
```

### 2. Test Devvit Upload (30 min)
```bash
# Install CLI
npm install -g devvit

# Login
devvit login

# Upload
devvit upload
```

### 3. Create Test Post (1 hour)
- Install to test subreddit
- Create custom post
- Verify game loads
- Test in Reddit environment

### 4. Add Leaderboard (2-3 hours)
**Simple Redis implementation**:
```typescript
// Save score
await context.redis.zAdd('leaderboard', {
  member: username,
  score: finalScore
})

// Get top 10
const top10 = await context.redis.zRange('leaderboard', 0, 9, {
  reverse: true
})
```

### 5. Polish & Test (1-2 hours)
- Test on mobile
- Fix any Reddit-specific bugs
- Adjust UI for Reddit frame
- Test leaderboard

### 6. Documentation (1 hour)
- Update README
- Add screenshots
- Write game description
- Controls guide

### 7. Demo Video (30 min)
- Record 2-3 min gameplay
- Show controls
- Show leaderboard
- Show Reddit integration

## 📊 Current Status

**Game**: 95% ✅
**Reddit Integration**: 0% ❌
**Leaderboard**: 0% ❌
**Documentation**: 40% 🟡
**Demo**: 0% ❌

## ⏱️ Time Estimate

**Minimum to ship**: 5-8 hours
**With polish**: 10-12 hours
**Days remaining**: 7 days

**Recommended schedule**:
- **Today**: Test game, note bugs (1 hr)
- **Tomorrow**: Install Devvit, upload, test (3-4 hrs)
- **Day 3**: Leaderboard implementation (2-3 hrs)
- **Day 4**: Polish, mobile test (2 hrs)
- **Day 5**: Documentation, demo video (2 hrs)
- **Day 6**: Final testing, submit (1 hr)
- **Day 7**: Buffer for issues

## 🎯 Minimum Viable Submission

To submit TODAY if needed:
1. Install Devvit (30 min)
2. Upload game (30 min)
3. Create post (30 min)
4. Basic README (30 min)
5. Submit (30 min)

**Total**: 2.5 hours for bare minimum

But you should add leaderboard for better submission!

## 📝 What You Need

### For Devvit Upload
- Reddit account
- Test subreddit (or create one)
- Devvit CLI installed
- App name (reddit-sky-racer)

### For Leaderboard
- Redis keys setup
- Score submission logic
- Top 10 display
- User authentication

### For Submission
- GitHub repo link
- Live demo URL (Devvit app)
- Demo video (2-3 min)
- Screenshots (3-5)
- Description (200-500 words)

## 🔥 What Makes Your Game Strong

1. **Unique Mechanics** - Flight-based (not another runner)
2. **Addicting** - You said it yourself!
3. **Visual Polish** - Smooth animations, effects
4. **Simple Controls** - Easy to learn
5. **Challenging** - Hard to master
6. **Performance** - Runs smooth
7. **Clean Code** - TypeScript, proper structure

## ⚠️ Potential Issues

1. **Devvit Integration** - Never tested (medium risk)
2. **Mobile** - Not tested yet (low risk)
3. **Leaderboard** - Redis untested (medium risk)
4. **Time** - 7 days is tight but doable (low risk)

## 💡 Quick Wins

These boost your submission with minimal effort:
- [ ] Add sound effects (1 hr)
- [ ] Add "Share Score" button (30 min)
- [ ] Add simple tutorial overlay (30 min)
- [ ] Add keyboard hints in UI (15 min)
- [ ] Polish game over screen (30 min)

## 🎮 Game Stats

- **Plane Size**: 32x32 (bigger, more visible)
- **Obstacles**: 12 initial, 8 minimum on screen
- **Spawn Rates**: 50% boxes, 15% rings, 15% buildings, 10% billboards, 10% cranes
- **Speed**: 3 normal, 6 boost (D), 7.8 turbo (Space)
- **Lives**: 3
- **Combo**: Up to 5x multiplier

## 🚀 Ready to Ship?

**Game is DONE**. Now just need to:
1. Wrap it for Reddit (Devvit)
2. Add leaderboard (Redis)
3. Document it
4. Submit

**You're 95% there!** The hard part (game mechanics) is finished. Just need the Reddit wrapper.

## Next Steps

1. **RIGHT NOW**: Play the game, make sure you're happy with it
2. **Tomorrow**: Install Devvit and upload
3. **This week**: Add leaderboard and polish
4. **Submit**: Before deadline

You got this! 🛩️🔥
