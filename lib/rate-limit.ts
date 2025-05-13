import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function rateLimit(identifier: string, limit: number, window: number) {
  const key = `ratelimit:${identifier}`
  const now = Date.now()
  const windowStart = now - window

  // Get all requests in the current window
  const requests = await redis.zrange(key, windowStart, now)
  
  // Remove expired requests
  await redis.zremrangebyscore(key, 0, windowStart)
  
  // Add current request
  await redis.zadd(key, { score: now, member: now.toString() })
  
  // Set expiry on the key
  await redis.expire(key, Math.ceil(window / 1000))
  
  // Check if limit is exceeded
  if (requests.length >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: windowStart + window,
    }
  }

  return {
    success: true,
    limit,
    remaining: limit - requests.length - 1,
    reset: windowStart + window,
  }
} 