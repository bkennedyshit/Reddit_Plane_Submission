# 🔐 Devvit Account Setup

## Quick Setup (5 minutes)

### 1. You Need a Reddit Account

If you don't have one:

- Go to [reddit.com](https://reddit.com)
- Click "Sign Up"
- Create your account (free)

### 2. Login to Devvit CLI

```bash
devvit login
```

This will:

1. Open your browser
2. Ask you to login to Reddit
3. Ask for permission to use Devvit
4. Redirect back to CLI

**That's it!** You're now logged in.

### 3. Verify Login

```bash
devvit whoami
```

Should show your Reddit username.

## Create a Test Subreddit

You need a subreddit with <200 subscribers to test your app.

### Option 1: Create New Subreddit

1. Go to [reddit.com/subreddits/create](https://reddit.com/subreddits/create)
2. Name it something like: `skyracertest` or `yourname_gametest`
3. Set it to **Private** (important!)
4. Click "Create Community"

### Option 2: Use Existing Small Subreddit

If you moderate a small subreddit (<200 members), you can use that.

## First Upload

Once logged in:

```bash
# Build the game
npm run build

# Upload to Reddit
npm run devvit:upload
```

This uploads your app to Reddit's App Directory (only visible to you).

## Install to Your Subreddit

```bash
devvit install YOUR_SUBREDDIT_NAME
```

Example:

```bash
devvit install skyracertest
```

## Create a Game Post

Two ways:

### Method 1: Via Subreddit Menu

1. Go to your test subreddit
2. Click the three dots (⋯) menu
3. Select "Create Sky Racer Game"

### Method 2: Via Mod Tools

1. Go to your test subreddit
2. Click "Mod Tools"
3. Click "Apps"
4. Find "Sky Racer"
5. Click "Create Post"

## Troubleshooting

### "Not logged in"

Run `devvit login` again.

### "Subreddit too large"

Your test subreddit must have <200 subscribers. Create a new private one.

### "Permission denied"

Make sure you're a moderator of the subreddit.

### "App not found"

Upload first: `npm run devvit:upload`

### Browser doesn't open

Copy the URL from terminal and paste in browser manually.

## What Happens After Login?

Devvit stores your credentials locally. You won't need to login again unless you:

- Logout (`devvit logout`)
- Clear your credentials
- Switch computers

## Privacy & Security

- Devvit only has access to what you grant
- Your app runs in a sandbox
- Reddit credentials are stored securely
- You can revoke access anytime in Reddit settings

## Next Steps

Once logged in:

1. ✅ Build: `npm run build`
2. ✅ Upload: `npm run devvit:upload`
3. ✅ Install: `devvit install YOUR_SUBREDDIT`
4. ✅ Test: Create a game post
5. ✅ Play: Click the post to play!

---

**Need help?** Check [Devvit Docs](https://developers.reddit.com/docs) or ask in [r/Devvit](https://reddit.com/r/devvit)
