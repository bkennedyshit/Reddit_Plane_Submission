# BMX Rider Character Integration Guide

## 📸 Your Character Image

You've provided a BMX rider character image that needs to be integrated into the game. Here's how to do it:

## 🎨 Step 1: Prepare the Image

### Option A: Remove Background (Recommended)
1. **Use an online tool** like:
   - remove.bg (https://www.remove.bg/)
   - Adobe Express Background Remover
   - Photopea (free Photoshop alternative)

2. **Upload your rider image**
3. **Download as PNG with transparent background**
4. **Save as**: `rider-character.png`

### Option B: Manual Cutting (Photoshop/GIMP)
1. Open image in Photoshop/GIMP
2. Use Magic Wand or Pen Tool to select the rider
3. Delete background (make transparent)
4. Export as PNG with transparency
5. Save as: `rider-character.png`

### Image Specifications
- **Format**: PNG with transparent background
- **Recommended Size**: 200x200px to 400x400px
- **Aspect Ratio**: Keep the rider proportional
- **File Size**: Under 500KB for performance

## 📁 Step 2: Add Image to Project

Create an assets folder and add your image:

```bash
mkdir public
mkdir public/assets
# Copy your rider-character.png to public/assets/
```

Or create these folders:
```
reddit-bmx-challenge/
├── public/
│   └── assets/
│       └── rider-character.png
```

## 🔧 Step 3: Update BMXPlayer Component

Replace the current SVG bike with your character image.

### Current Code Location
File: `components/game/BMXPlayer.tsx`

### Replace This Section:
Find the SVG bike code (around line 20-60) and replace with:

```tsx
import { ImageWithFallback } from '../figma/ImageWithFallback'

// Inside the component, replace the SVG section with:
<div className="relative w-16 h-16">
  <ImageWithFallback
    src="/assets/rider-character.png"
    alt="BMX Rider"
    className="w-full h-full object-contain"
    style={{
      filter: player.isGrinding ? 'brightness(1.2)' : 'none',
      transition: 'filter 0.2s ease'
    }}
  />
</div>
```

## 🎭 Step 4: Create Multiple States (Optional but Awesome)

For better animation, create different versions of your rider:

### Image Variations Needed:
1. **rider-idle.png** - Normal riding position
2. **rider-jump.png** - Jumping/airborne position
3. **rider-grind.png** - Grinding on rail position
4. **rider-trick.png** - Doing a trick position

### Implementation with States:
```tsx
const getRiderImage = () => {
  if (player.isGrinding) return '/assets/rider-grind.png'
  if (player.isJumping) return '/assets/rider-jump.png'
  if (player.trickScore > 0) return '/assets/rider-trick.png'
  return '/assets/rider-idle.png'
}

<ImageWithFallback
  src={getRiderImage()}
  alt="BMX Rider"
  className="w-full h-full object-contain"
/>
```

## 🎬 Step 5: Add Animation Effects

### Rotation Animation
The rider should rotate during tricks:
```tsx
<motion.div
  animate={{
    rotate: player.rotation,
    scale: player.isJumping ? 1.1 : 1
  }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20
  }}
>
  <ImageWithFallback src="/assets/rider-character.png" ... />
</motion.div>
```

### Speed Lines Effect
Add motion blur when moving fast:
```tsx
{Math.abs(player.velocityX) > 5 && (
  <motion.div
    className="absolute -right-8 top-1/2 -translate-y-1/2"
    animate={{
      opacity: [0, 1, 0],
      x: [0, -20, -40],
    }}
    transition={{
      duration: 0.3,
      repeat: Infinity,
    }}
  >
    <div className="w-12 h-1 bg-white/50 rounded-full" />
    <div className="w-8 h-1 bg-white/30 rounded-full mt-1" />
  </motion.div>
)}
```

## 🎨 Step 6: Sprite Sheet (Advanced)

If you want smooth frame-by-frame animation:

### Create Sprite Sheet:
1. Arrange multiple poses in a single image (e.g., 4x4 grid)
2. Use CSS to show different frames
3. Animate through frames based on game state

### Example Sprite Sheet Usage:
```tsx
<div
  className="sprite-animation"
  style={{
    backgroundImage: 'url(/assets/rider-spritesheet.png)',
    backgroundPosition: `${frameX * -64}px ${frameY * -64}px`,
    width: '64px',
    height: '64px'
  }}
/>
```

## 🔍 Step 7: Testing

After integration, test these scenarios:
- [ ] Rider appears on screen
- [ ] Rider rotates during tricks (Q/E keys)
- [ ] Rider tilts when moving left/right
- [ ] Rider scales up slightly when jumping
- [ ] Grinding sparks appear at correct position
- [ ] Speed lines appear when moving fast
- [ ] Image loads properly (no broken image icon)

## 🐛 Troubleshooting

### Image Not Showing?
1. Check file path is correct: `/assets/rider-character.png`
2. Verify image is in `public/assets/` folder
3. Check browser console for 404 errors
4. Try absolute path: `http://localhost:3000/assets/rider-character.png`

### Image Too Big/Small?
Adjust the container size:
```tsx
<div className="relative w-20 h-20"> {/* Adjust w-20 h-20 */}
```

### Image Not Transparent?
- Re-export as PNG with alpha channel
- Check if background was actually removed
- Use online tools to verify transparency

### Performance Issues?
- Compress image (use TinyPNG.com)
- Reduce image dimensions
- Use WebP format instead of PNG

## 📝 Quick Implementation Checklist

1. [ ] Remove background from rider image
2. [ ] Save as `rider-character.png`
3. [ ] Create `public/assets/` folder
4. [ ] Copy image to `public/assets/`
5. [ ] Update `BMXPlayer.tsx` to use image
6. [ ] Test in browser
7. [ ] Add animation effects
8. [ ] (Optional) Create multiple state images
9. [ ] (Optional) Add sprite sheet for smooth animation

## 🎯 Final Result

Your custom BMX rider will:
- Replace the current SVG bike
- Rotate during tricks
- Scale during jumps
- Show grinding effects
- Display speed lines
- Look awesome! 🚴‍♂️💨

## 💡 Pro Tips

1. **Keep it simple first** - Start with one image, add variations later
2. **Test frequently** - Check after each change
3. **Use DevTools** - Inspect element to debug positioning
4. **Optimize early** - Compress images before adding
5. **Version control** - Keep original high-res images separate

---

Need help with any step? Just ask!
