import { Devvit } from '@devvit/public-api'

// App installation handler
export async function onAppInstall(event: any, context: any) {
  console.log(`BMX Challenge installed in subreddit: ${context.subredditName}`)

  // Initialize subreddit-specific settings
  await context.redis.set(`subreddit:${context.subredditId}:settings`, JSON.stringify({
    difficulty: 'medium',
    maxPlayers: 10,
    timeLimit: 300, // 5 minutes
    allowCustomCourses: true,
    createdAt: Date.now()
  }))
}

// App uninstall handler
export async function onAppUninstall(event: any, context: any) {
  console.log(`BMX Challenge uninstalled from subreddit: ${context.subredditName}`)

  // Clean up subreddit data
  const keys = await context.redis.keys(`subreddit:${context.subredditId}:*`)
  if (keys.length > 0) {
    await context.redis.del(...keys)
  }
}

// Post submission handler
export async function onPostSubmit(event: any, context: any) {
  const { postId, subredditId, title } = event

  // Check if this is a BMX Challenge post
  if (title.toLowerCase().includes('bmx challenge') ||
      title.toLowerCase().includes('bmx race')) {

    // Create a new game session for this post
    const sessionId = `session:${postId}:${Date.now()}`
    const gameSession = {
      id: sessionId,
      postId,
      subredditId,
      players: [],
      spectators: [],
      status: 'waiting',
      settings: {
        mode: 'global',
        difficulty: 'medium',
        maxPlayers: 20,
        timeLimit: 300
      },
      createdAt: Date.now()
    }

    await context.redis.set(`game-session:${sessionId}`, JSON.stringify(gameSession))

    console.log(`Created game session ${sessionId} for post ${postId}`)
  }
}
