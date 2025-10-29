# Controls Update - Simplified

## New Controls

### Movement
- **W / ↑** - Fly Up
- **S / ↓** - Fly Down

### Speed
- **D / →** - Speed Boost (faster scrolling)
- **Space** - Turbo Boost (even faster!)

### Tricks
- **A** - Barrel Roll (complete 360° for +50 points)
- **Q / E** - Quick Trick Points (+25 each)

## Changes Made

### 1. Removed Plane Rotation
- Plane stays level (no tilting forward/backward)
- Cleaner look, easier to control
- No more confusing rotation

### 2. Speed Control on D
- **Before**: D did barrel roll
- **After**: D increases speed
- More intuitive for racing forward

### 3. Barrel Roll on A Only
- **Before**: A and D both did barrel roll
- **After**: Only A does barrel roll
- Simpler, less accidental rolls

### 4. Simplified Tricks
- **Before**: Q/E did full loop-de-loops (rotation based)
- **After**: Q/E give instant trick points
- Works better without rotation

### 5. Clean Plane Sprite
- Using `jetplane-clean.png` (no black background)
- Falls back to original if not found
- Better visual quality

## Gameplay Impact

### Easier to Learn
- No rotation confusion
- Clear speed vs trick controls
- Intuitive left/right separation

### More Focused
- Speed on right (D, Space)
- Tricks on left (A, Q, E)
- Movement on arrows/WASD

### Better Flow
- Constant forward motion
- Speed boost for dodging
- Tricks for points

## Testing Notes

Test these scenarios:
1. Hold D - should go faster
2. Tap Space - should turbo boost
3. Hold A - should barrel roll (360° = +50 pts)
4. Tap Q/E - should add trick points
5. W/S - should move up/down smoothly
6. Plane should stay level (no rotation)

## Visual Changes

- Plane no longer tilts
- Clean sprite (no black background)
- Same boost effects
- Same particle effects
