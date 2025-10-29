# 🛩️ Sky Racer - Reddit Devvit Game

Fly your jet through the city, dodge obstacles, and compete for high scores on Reddit!

![Sky Racer](./public/jetplane.png)

## 🎮 About

Sky Racer is a fast-paced flight game built for Reddit's Developer Platform (Devvit). Pilot your jet through a bustling cityscape, perform tricks, collect rings, and climb the leaderboard!

**Built for:** Reddit Devvit Hackathon - Community Play Category

## ✨ Features

- **Smooth Flight Physics** - Vertical movement with realistic controls
- **Dynamic Obstacles** - Buildings, cranes, floating boxes, and bonus rings
- **Trick System** - Barrel rolls, loops, and combos for bonus points
- **Global Leaderboard** - Compete with other Reddit users
- **Real-time Scoring** - Live score updates and multipliers
- **Reddit Integration** - Native user authentication and profiles

## 🎯 How to Play

### Controls
- **W / ↑** - Fly up
- **S / ↓** - Fly down
- **A** - Barrel roll (left)
- **D** - Speed boost
- **Space** - Turbo boost
- **Q / E** - Loop-de-loop

### Scoring
- **Distance** - Auto-scroll points
- **Rings** - +100 points (fly through them!)
- **Obstacles** - +10-30 points for passing
- **Tricks** - +25-100 points for barrel rolls and loops
- **Combos** - Up to 5x multiplier for consecutive successes

### Lives
You have 3 lives. Lose one when you hit:
- Buildings
- Cranes
- Floating boxes
- The ground

## 🚀 Quick Start

### Play on Reddit
1. Visit the game post on Reddit
2. Click to start playing
3. Your scores automatically save to the leaderboard!

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Deploy to Reddit
```bash
# Login to Devvit
devvit login

# Build the game
npm run build

# Upload to Reddit
npm run devvit:upload

# Install to your test subreddit
devvit install YOUR_SUBREDDIT_NAME
```

See [DEVVIT_SETUP.md](./DEVVIT_SETUP.md) for detailed setup instructions.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS + shadcn/ui
- **Platform**: Reddit Devvit
- **Database**: Redis (leaderboard)
- **Build**: Vite

## 📁 Project Structure

```
reddit-sky-racer/
├── src/
│   ├── main.tsx              # Devvit app entry point
│   ├── GamePost.tsx          # Game post component
│   └── handlers.ts           # Event handlers
├── components/
│   ├── game/
│   │   ├── JetPlane.tsx      # Player component
│   │   ├── GameObstacles.tsx # Obstacle rendering
│   │   └── GameUI.tsx        # HUD and UI
│   └── ui/                   # Reusable UI components
├── hooks/
│   ├── useGameEngine.ts      # Core game logic
│   └── useDevvitBridge.ts    # Reddit integration
├── CityBackground.tsx        # Animated background
├── App.tsx                   # Main game component
└── devvit.yaml              # Devvit configuration
```

## 🎨 Game Design

### Obstacles
- **Buildings** (15%) - Ground-level structures to dodge
- **Cranes** (10%) - Construction obstacles
- **Floating Boxes** (60%) - Air obstacles scattered throughout
- **Rings** (15%) - Bonus collectibles (fly through for points!)

### Difficulty
- Progressive challenge as you fly further
- Increasing obstacle density
- Faster scroll speed with boost

### Visual Effects
- Engine trails and sparks
- Particle effects on tricks
- Smooth animations with Framer Motion
- Parallax scrolling background

## 🏆 Leaderboard

The global leaderboard tracks:
- Top 10 scores across all players
- Personal high scores
- Reddit usernames
- Real-time updates

Powered by Redis for fast, reliable score storage.

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run devvit:upload` - Upload to Reddit
- `npm run devvit:playtest` - Live testing with auto-reload

### Adding Features

The game is modular and easy to extend:
- Add new obstacles in `GameObstacles.tsx`
- Modify physics in `useGameEngine.ts`
- Update scoring in the game loop
- Add power-ups or achievements

## 🤝 Contributing

This is a hackathon submission, but feel free to:
- Report bugs
- Suggest features
- Fork and improve!

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

- Built with [Reddit Devvit](https://developers.reddit.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Animations by [Framer Motion](https://www.framer.com/motion)

## 🎯 Hackathon Submission

**Category:** Community Play
**Theme:** Building engaging, community-driven gaming experiences on Reddit

### Why Sky Racer?

1. **Unique Mechanics** - Flight-based gameplay (not another runner)
2. **Community Focus** - Global leaderboard brings players together
3. **Reddit Native** - Built specifically for Reddit's platform
4. **Addictive Gameplay** - Easy to learn, hard to master
5. **Visual Polish** - Smooth animations and effects

---

**Ready to fly?** 🛩️ Install Sky Racer on your subreddit and start competing!

For setup help, see [DEVVIT_SETUP.md](./DEVVIT_SETUP.md)
