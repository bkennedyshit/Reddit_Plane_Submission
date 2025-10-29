# 🚴 Add Your Rider Image - Quick Guide

## Step 1: Remove Background from Your Image

### Option A: Use remove.bg (Easiest)
1. Go to https://remove.bg
2. Upload your rider image (the one you showed me)
3. Click "Download" to get the PNG with transparent background

### Option B: Use Photopea (Free Photoshop)
1. Go to https://www.photopea.com
2. Open your rider image
3. Use Magic Wand tool to select background
4. Press Delete
5. File > Export As > PNG

## Step 2: Save the Image

1. Save the image as `rider.png`
2. Put it in the `public/assets/` folder
3. Full path should be: `public/assets/rider.png`

## Step 3: Refresh the Game

The game will automatically use your rider image!

If the image doesn't show:
- Check the browser console (F12) for errors
- Make sure the file is named exactly `rider.png`
- Make sure it's in `public/assets/` folder
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## ✅ Done!

Your custom rider will now:
- Rotate during tricks
- Scale up when jumping
- Glow when grinding
- Show speed lines when moving fast
- Display trick scores above

---

**Current Status**: 
- ✅ Button clicks fixed
- ✅ Game controls working
- ✅ Rider component ready for your image
- ⏳ Waiting for you to add `rider.png` to `public/assets/`

**Test the game now** - buttons should work! Press the "Start Game" button to play.
