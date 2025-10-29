# Reddit Devvit Setup Guide

## Quick Start (5 minutes)

### 1. Install Devvit CLI
```bash
npm install -g devvit
```

### 2. Login to Reddit
```bash
devvit login
```

### 3. Create App on Reddit
```bash
devvit new --template=custom-post
# Or use existing project
cd reddit-sky-racer
```

### 4. Upload the App
```bash
devvit upload
```

### 5. Install to Subreddit
```bash
devvit install <your-subreddit-name>
```

### 6. Create a Game Post
- Go to your subreddit
- Click "Create Post"
- Select "Sky Racer" from custom post types
- Or use mod menu: "Create Sky Racer Game"

## Project Structure

```
reddit-sky-racer/
├── src/
│   ├── main.tsx              # Devvit app entry point
│   ├── GamePost.tsx          # Game post component
│   └── handlers.ts           # Event handlers
├── components/
│   └── game/                 # Game components
├── hooks/
│   ├── useGameEngine.ts      # Game logic
│   └── useDevvitBridge.ts    # Reddit integration
├── public/
│   └── game.html             # Embedded game
├── devvit.yaml               # Devvit configuration
└── package.json
```

## How It Works

1. **Custom Post Type**: Creates a Reddit post with embedded game
2. **Webview**: Game runs in iframe within Reddit
3. **Redis Leaderboard**: Stores scores using Redis sorted sets
4. **Message Bridge**: Game communicates with Reddit via postMessage

## Redis Data Structure

```
# User high scores
user:{userId}:highscore -> "12500"

# Global leaderboard (sorted set)
global:leaderboard -> {
  "username1": 15000,
  "username2": 12500,
  "username3": 10000
}

# Subreddit leaderboards (optional)
subreddit:{subredditId}:leaderboard -> sorted set
```

## Testing Locally

### Development Mode
```bash
npm run dev
# Opens at http://localhost:5173
```

### Test with Devvit Playtest
```bash
devvit playtest <your-subreddit-name>
```

## Deployment Checklist

- [ ] Test game locally
- [ ] Upload to Devvit: `devvit upload`
- [ ] Install to test subreddit
- [ ] Create test post
- [ ] Verify leaderboard works
- [ ] Test on mobile
- [ ] Submit scores
- [ ] Check Redis data

## Common Issues

### Game not loading
- Check webview URL in GamePost.tsx
- Verify game.html is in public/
- Check browser console for errors

### Scores not saving
- Verify Redis is enabled in devvit.yaml
- Check user authentication
- Look at Devvit logs: `devvit logs`

### Leaderboard empty
- Submit at least one score
- Check Redis key: `global:leaderboard`
- Verify zRange query

## Devvit Commands

```bash
# Upload new version
devvit upload

# View logs
devvit logs

# List installations
devvit list installs

# Uninstall from subreddit
devvit uninstall <subreddit-name>

# Update app
devvit upload --bump patch
```

## Production Checklist

- [ ] Update version in devvit.yaml
- [ ] Test all features
- [ ] Optimize bundle size
- [ ] Add error handling
- [ ] Set up monitoring
- [ ] Document controls
- [ ] Create demo video
- [ ] Submit to hackathon

## Hackathon Submission

Include:
1. **GitHub repo** with code
2. **Live demo** (Devvit app URL)
3. **Video** showing gameplay
4. **Screenshots** of leaderboard
5. **Description** of features

## Support

- Devvit Docs: https://developers.reddit.com/docs
- Devvit Discord: https://discord.gg/devvit
- Reddit API: https://www.reddit.com/dev/api

## Next Steps

1. Test the game locally
2. Upload to Devvit
3. Install to test subreddit
4. Debug any issues
5. Polish and submit!
