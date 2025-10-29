# 🚀 Quick Deploy Guide

## Current Status
✅ Logged in as: **billykennedyshit**
✅ Build complete: dist/ folder ready
⏳ Need to set up Devvit Web structure

## The Issue
Devvit has two types of apps:
1. **Devvit Blocks** - Server-side rendered (what `devvit upload` expects)
2. **Devvit Web** - Client-side web apps (what we built)

We built a **Devvit Web** app, which needs a different deployment approach.

## Solution: Use Devvit Web Template

### Option 1: Convert to Devvit Web (Recommended)
```bash
# 1. Create a new Devvit Web project
devvit new sky-racer-web --template=web

# 2. Copy our game files into it
# Copy dist/ folder
# Copy src/main.tsx
# Copy devvit.yaml

# 3. Upload from the new project
cd sky-racer-web
devvit upload
```

### Option 2: Use Devvit Playtest (Faster)
```bash
# This starts a local server and creates a test installation
devvit playtest
```

This will:
- Start a local dev server
- Create a tunnel to your game
- Install it to a test subreddit
- Give you a link to play

## Recommended Next Steps

### Quick Test (5 minutes)
1. Create a test subreddit on Reddit
   - Go to reddit.com/subreddits/create
   - Name: `skyracertest` (or similar)
   - Type: Private (for testing)
   - Create it

2. Run playtest:
   ```bash
   devvit playtest skyracertest
   ```

3. This will give you a link to test the game

### Full Deploy (15 minutes)
1. Clone the Devvit Web template
2. Copy our game into it
3. Upload properly
4. Install to public subreddit
5. Submit to hackathon

## Alternative: Host Externally

Since we have a working web game, we could also:
1. Deploy to Vercel/Netlify (free)
2. Use that URL in a Reddit post
3. Still counts for the hackathon!

## What Do You Want to Do?

A. Try `devvit playtest` for quick testing
B. Set up proper Devvit Web structure
C. Deploy to Vercel and link from Reddit
D. Check Devvit docs for Web apps

Let me know and I'll help you proceed!
