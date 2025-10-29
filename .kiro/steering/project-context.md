# Sky Racer - Project Context

## Project Overview

Sky Racer is a jet plane racing game where players fly through a city dodging obstacles. Built for Reddit's Devvit platform, this is a hackathon submission for the "Community Play" category, focusing on creating engaging, community-driven gaming experiences within Reddit.

## Tech Stack

- **Platform**: Reddit Devvit Web
- **Frontend**: React + TypeScript
- **Animation**: Framer Motion
- **State Management**: Redis (for multiplayer)
- **UI Components**: shadcn/ui
- **API**: Reddit API integration

## Key Architecture Principles

- Physics-based flight mechanics with vertical movement
- Real-time multiplayer with live leaderboards
- Procedural obstacle generation (buildings, cranes, rings, billboards)
- Reddit-native integration (user profiles, posts, subreddits)
- Performance-optimized for 60fps gameplay
- Responsive design for mobile and desktop

## Project Structure

- `src/` - Devvit app entry point and multiplayer logic
- `components/game/` - Game-specific components (JetPlane, GameObstacles, GameUI)
- `components/ui/` - Reusable UI components (shadcn/ui)
- `hooks/` - Game physics and state management
- `CityBackground.tsx` - Animated city skyline with parallax clouds
- `jetplane.png` - Player sprite
- `devvit.yaml` - Devvit platform configuration

## Gameplay Mechanics

- **Flight Controls**: W/↑ (up), S/↓ (down), A/D or ←/→ (barrel roll), Space (boost), Q/E (loop-de-loop)
- **Obstacles**: Buildings, cranes, billboards (avoid), rings (fly through for bonus)
- **Scoring System**:
  - Distance traveled (auto-scroll)
  - Flying through rings: +100 points
  - Near-miss bonuses: +30 points
  - Passing obstacles: +20-40 points
  - Trick bonuses: Barrel rolls (+50), Loops (+100)
  - Combo multiplier (up to 5x) for consecutive successful maneuvers
- **Lives**: 3 lives, lose one on collision with buildings/cranes/billboards

## Development Guidelines

- Follow Reddit's Devvit best practices
- Maintain 60fps performance target
- Ensure accessibility (keyboard navigation, screen readers)
- Keep Reddit integration native and seamless
- Use TypeScript for type safety
- Optimize for both synchronous and asynchronous gameplay

## Community Features

- Session-based multiplayer gameplay
- Live spectator mode
- Cross-subreddit challenges
- Community leaderboards (global and subreddit-specific)
- Social sharing and friend challenges
