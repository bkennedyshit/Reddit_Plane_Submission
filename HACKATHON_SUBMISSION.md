# 🏆 Sky Racer - Hackathon Submission

## Contest Entry

**Submitting for:**
- ✅ Reddit Best App: Community Play
- ✅ Best Kiro Developer Experience

## App Information

**Name:** Sky Racer
**Category:** Community Play - Gaming
**Description:** A fast-paced jet flight game where players navigate through a city, dodge obstacles, perform tricks, and compete on a global leaderboard.

## Submission Links

### Required Links
- **App Listing:** [To be added after upload to developer.reddit.com]
- **Demo Post:** [To be added after creating public post]
- **GitHub Repo:** [Your GitHub URL]
- **Developer Survey:** [To be completed]

### Demo Subreddit
- **Subreddit:** r/[YOUR_SUBREDDIT_NAME]
- **Post Title:** "🛩️ Sky Racer - Fly Through The City!"
- **Access:** Public (anyone can play)

## Game Overview

### What is Sky Racer?
Sky Racer is a browser-based flight game built natively for Reddit using Devvit. Players pilot a jet through a vibrant cityscape, dodging buildings and obstacles while collecting bonus rings and performing aerial tricks.

### Key Features
- **Smooth Flight Physics** - Vertical movement with realistic controls
- **Dynamic Obstacles** - Buildings, cranes, floating boxes, and collectible rings
- **Trick System** - Barrel rolls and loops for bonus points
- **Global Leaderboard** - Real-time competition with other Reddit users
- **Combo Multiplier** - Up to 5x score multiplier for consecutive successes
- **Reddit Integration** - Native user authentication and persistent scores

### Why Community Play?
1. **Competitive Leaderboard** - Players compete globally for high scores
2. **Social Engagement** - See other players' scores and usernames
3. **Persistent Progress** - High scores saved per user
4. **Easy to Share** - Just share the Reddit post to challenge friends
5. **Community Building** - Creates friendly competition within subreddits

## Technical Implementation

### Tech Stack
- **Frontend:** React + TypeScript
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS + shadcn/ui
- **Platform:** Reddit Devvit Web
- **Database:** Redis (leaderboard storage)
- **Build:** Vite

### Devvit Integration
- Custom post type with webview
- Redis for persistent leaderboard
- Reddit API for user authentication
- Real-time score updates
- Cross-platform compatibility (desktop + mobile)

### Game Mechanics
- **Controls:** W/S (up/down), A (barrel roll), D/Space (boost), Q/E (loops)
- **Scoring:** Distance + rings (100pts) + tricks (25-100pts) + combos (up to 5x)
- **Lives:** 3 lives, lose one on collision
- **Difficulty:** Progressive challenge with increasing obstacle density

## Kiro Developer Experience

### How Kiro Improved Development

#### 1. Rapid Prototyping
Kiro's AI assistance helped me quickly iterate on game mechanics:
- Converted BMX game concept to flight mechanics in minutes
- Adjusted physics and controls through natural language
- Tested different obstacle spawn rates instantly

#### 2. Code Quality
- TypeScript implementation with proper types
- Clean component structure suggested by Kiro
- No diagnostic errors throughout development
- Modular game engine design

#### 3. Problem Solving
Kiro helped solve specific challenges:
- **Collision Detection:** Adjusted margins for better gameplay feel
- **Obstacle Positioning:** Fixed buildings to sit on ground properly
- **Background Integration:** Swapped backgrounds while maintaining game logic
- **Performance:** Optimized rendering for 60fps target

#### 4. Documentation
Kiro generated comprehensive documentation:
- README with full project details
- Setup guides for Devvit deployment
- Submission checklists and status tracking
- Code comments and explanations

#### 5. Devvit Integration
Kiro streamlined Reddit integration:
- Installed and configured Devvit packages
- Set up Redis leaderboard
- Implemented message bridge between game and Reddit
- Created custom post type with proper webview

### Development Workflow

**Before Kiro:**
- Manual research for Devvit documentation
- Trial and error for game physics
- Time-consuming debugging
- Estimated: 40-60 hours

**With Kiro:**
- Natural language requests for features
- Instant code generation and fixes
- Real-time diagnostics and corrections
- Actual time: ~8-10 hours

**Time Saved:** ~75% reduction in development time

### Creative Solutions

1. **Adaptive Collision System**
   - Kiro helped implement forgiving collision (30px margin)
   - Balances challenge with fun gameplay
   - Adjustable through simple constant changes

2. **Modular Game Engine**
   - Clean separation of concerns
   - Easy to add new obstacle types
   - Reusable components for future games

3. **Seamless Reddit Integration**
   - Bridge pattern for game ↔ Reddit communication
   - Automatic score submission
   - Real-time leaderboard updates

### Future Applications

The patterns learned with Kiro apply to:
- Other Devvit game projects
- React-based web applications
- Real-time multiplayer systems
- Leaderboard implementations
- Physics-based games

## Project Structure

```
reddit-sky-racer/
├── .kiro/                    # Kiro configuration
│   └── steering/
│       └── project-context.md
├── src/
│   ├── main.tsx             # Devvit entry point
│   └── GamePost.tsx         # Game post component
├── components/
│   ├── game/
│   │   ├── JetPlane.tsx     # Player component
│   │   ├── GameObstacles.tsx # Obstacles
│   │   └── GameUI.tsx       # HUD
│   └── ui/                  # Reusable components
├── hooks/
│   ├── useGameEngine.ts     # Core game logic
│   └── useDevvitBridge.ts   # Reddit integration
├── CityBackground.tsx       # Animated background
├── App.tsx                  # Main game
└── devvit.yaml             # Devvit config
```

## Open Source

**License:** MIT
**Repository:** [Your GitHub URL]
**Contributions:** Welcome!

## Demo Instructions

### How to Play
1. Visit the demo post on r/[YOUR_SUBREDDIT]
2. Click the post to open the game
3. Use keyboard controls to fly
4. Try to beat the high score!

### Controls
- **W / ↑** - Fly up
- **S / ↓** - Fly down
- **A** - Barrel roll
- **D** - Speed boost
- **Space** - Turbo boost
- **Q / E** - Loop-de-loop

### Scoring Tips
- Fly through rings for +100 points
- Perform tricks for bonus points
- Build combos for up to 5x multiplier
- Avoid obstacles to keep your lives

## Screenshots

[Add 3-5 screenshots of gameplay]

## Video Demo

[Optional: Link to 2-3 minute gameplay video]

## Developer Feedback

Completed developer satisfaction survey: [Link]

## Contact

- **Reddit:** u/[YOUR_USERNAME]
- **GitHub:** [YOUR_GITHUB]
- **Email:** [OPTIONAL]

## Acknowledgments

- Built with [Reddit Devvit](https://developers.reddit.com)
- Developed using [Kiro AI](https://kiro.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Animations by [Framer Motion](https://www.framer.com/motion)

---

**Thank you for considering Sky Racer!** 🛩️

Built with ❤️ using Kiro AI and Reddit Devvit
