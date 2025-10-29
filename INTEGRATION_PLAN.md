# Reddit Integration - Simplified Approach

## Current Status ✅
- Game works standalone (React + Vite)
- Flight mechanics complete
- Scoring system working
- Visual effects polished

## Integration Strategy

### Phase 1: Test Standalone (TODAY - 2 hours)
1. Run `npm run dev`
2. Test all controls and gameplay
3. Fix any bugs
4. Balance difficulty
5. Verify scoring

### Phase 2: Add Devvit Package (TODAY - 1 hour)
```bash
npm install @devvit/public-api @devvit/kit
```

Update package.json scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "devvit:upload": "devvit upload",
    "devvit:playtest": "devvit playtest"
  }
}
```

### Phase 3: Create Minimal Devvit Wrapper (TOMORROW - 3 hours)

**Option A: Simple Webview (Recommended)**
- Embed game in iframe
- Use postMessage for scores
- Minimal code changes

**Option B: Full Integration**
- Rewrite with Devvit components
- More work, better integration

### Phase 4: Leaderboard (TOMORROW - 2 hours)
```typescript
// Save score
await context.redis.zAdd('leaderboard', {
  member: username,
  score: finalScore
})

// Get top 10
const top10 = await context.redis.zRange('leaderboard', 0, 9, {
  reverse: true,
  by: 'score'
})
```

### Phase 5: Test & Polish (DAY 3 - 3 hours)
- Upload to Devvit
- Install to test subreddit
- Create test post
- Verify leaderboard
- Fix bugs
- Mobile testing

### Phase 6: Documentation (DAY 3 - 2 hours)
- README with screenshots
- Demo video (2-3 min)
- Controls guide
- Submission form

## Minimal Viable Devvit App

```typescript
// src/main.tsx
import { Devvit } from '@devvit/public-api'

Devvit.configure({
  redditAPI: true,
  redis: true,
})

Devvit.addCustomPostType({
  name: 'Sky Racer',
  height: 'tall',
  render: (context) => {
    return (
      <vstack height="100%" width="100%">
        <webview
          id="game"
          url="game.html"
          width="100%"
          height="100%"
          onMessage={async (msg) => {
            if (msg.type === 'gameOver') {
              const user = await context.reddit.getCurrentUser()
              await context.redis.zAdd('leaderboard', {
                member: user.username,
                score: msg.score
              })
            }
          }}
        />
      </vstack>
    )
  },
})

export default Devvit
```

## Files Needed

### Must Have
- [x] Game code (App.tsx, components, hooks) ✅
- [x] Devvit bridge (useDevvitBridge.ts) ✅
- [ ] Devvit main.tsx (needs @devvit/public-api)
- [ ] devvit.yaml config ✅
- [ ] public/game.html ✅

### Nice to Have
- [ ] Leaderboard UI component
- [ ] User profile integration
- [ ] Subreddit-specific scores
- [ ] Share to comments

## Testing Checklist

### Local Testing
- [ ] `npm run dev` works
- [ ] Game loads
- [ ] Controls responsive
- [ ] Scoring accurate
- [ ] No console errors

### Devvit Testing
- [ ] `devvit upload` succeeds
- [ ] Install to subreddit
- [ ] Create custom post
- [ ] Game loads in Reddit
- [ ] Scores save to Redis
- [ ] Leaderboard displays
- [ ] Mobile works

## Timeline (Realistic)

**Day 1 (Today)**: 
- Test standalone game (2 hrs)
- Fix bugs (2 hrs)
- Install Devvit CLI (30 min)

**Day 2**:
- Add Devvit package (1 hr)
- Create minimal wrapper (2 hrs)
- Add leaderboard (2 hrs)
- Test upload (1 hr)

**Day 3**:
- Debug Reddit integration (2 hrs)
- Polish UI (1 hr)
- Mobile testing (1 hr)
- Documentation (2 hrs)

**Day 4-5**:
- Create demo video (1 hr)
- Screenshots (30 min)
- Write submission (1 hr)
- Final testing (1 hr)
- Submit! 🚀

**Total**: ~18 hours over 5 days

## Quick Commands

```bash
# Test locally
npm run dev

# Install Devvit CLI
npm install -g devvit

# Login
devvit login

# Upload
devvit upload

# Install to subreddit
devvit install YOUR_SUBREDDIT

# View logs
devvit logs

# Playtest
devvit playtest YOUR_SUBREDDIT
```

## Next Immediate Steps

1. **RIGHT NOW**: Test the game
   ```bash
   npm run dev
   ```

2. **Debug**: Fix any issues you find

3. **Tomorrow**: Install Devvit and integrate

4. **This week**: Polish and submit

You're 70% done! The hard part (game mechanics) is finished. Now just wrap it for Reddit.
