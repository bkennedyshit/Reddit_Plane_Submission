# 🚀 Devvit Setup Guide - Sky Racer

## Quick Start (5 minutes)

### 1. Login to Devvit

```bash
devvit login
```

This will open your browser to authenticate with Reddit.

### 2. Build the Game

```bash
npm run build
```

This creates the production build in `dist/`.

### 3. Upload to Reddit

```bash
npm run devvit:upload
```

This uploads your app to Reddit's App Directory (private to you).

### 4. Install to Test Subreddit

You need a test subreddit with <200 subscribers. Create one if needed:

- Go to reddit.com
- Create a new subreddit (e.g., r/skyracertest)
- Make it private

Then install:

```bash
devvit install YOUR_SUBREDDIT_NAME
```

### 5. Create a Game Post

- Go to your test subreddit
- Click "Mod Tools" → "Apps"
- Find "Sky Racer"
- Click "Create Sky Racer Game"

OR use the menu:

- Go to your subreddit
- Click the three dots menu
- Select "Create Sky Racer Game"

### 6. Play!

Click on the post to play the game. Your scores will be saved to the leaderboard!

## Development Workflow

### Live Testing (Recommended)

```bash
npm run devvit:playtest
```

This starts a live session where changes auto-upload to your test subreddit.

### Manual Upload

```bash
npm run devvit:upload
```

Upload a new version manually.

### View Logs

```bash
devvit logs YOUR_SUBREDDIT_NAME
```

See real-time logs from your app.

## Leaderboard

The leaderboard is automatically set up using Redis:

- **Global leaderboard**: Top 10 scores across all players
- **Personal high score**: Each user's best score
- **Auto-updates**: Scores update in real-time

### Redis Keys Used:

- `user:{userId}:highscore` - Individual high scores
- `global:leaderboard` - Sorted set of all scores

## Features Enabled

✅ **Reddit API** - User authentication, post creation
✅ **Redis** - Leaderboard and score storage
✅ **HTTP** - Future API calls if needed
✅ **Webview** - Embedded game iframe

## Troubleshooting

### "Not logged in"

```bash
devvit login
```

### "Subreddit too large"

Test subreddits must have <200 subscribers. Create a new private one.

### "App not found"

Make sure you've uploaded first:

```bash
npm run devvit:upload
```

### Game not loading

Check the webview URL in `src/main.tsx` - should be `index.html`

### Scores not saving

Check Redis is enabled in `devvit.yaml` (it is by default)

## Next Steps

1. **Test the game** - Play for 5-10 minutes
2. **Check leaderboard** - Make sure scores save
3. **Test on mobile** - Reddit mobile app
4. **Polish UI** - Adjust colors/layout for Reddit
5. **Submit** - When ready, publish your app!

## Publishing (When Ready)

```bash
devvit publish
```

This makes your app available in the App Directory for others to install.

## Support

- [Devvit Docs](https://developers.reddit.com/docs)
- [Devvit Discord](https://discord.gg/devvit)
- [Reddit r/Devvit](https://reddit.com/r/devvit)

---

**You're all set!** 🛩️ Time to fly!
