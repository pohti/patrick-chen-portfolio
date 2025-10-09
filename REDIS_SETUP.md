# Redis Cache Setup

This application supports both Upstash Redis and in-memory caching for weather data. Upstash Redis is recommended for production use due to its serverless-friendly design.

## Upstash Redis (Recommended)

- **Free Tier**: 10,000 requests per day
- **Serverless**: Perfect for Next.js applications
- **No Connection Management**: Uses REST API instead of persistent connections
- **Setup**: https://upstash.com/

### Steps:

1. Sign up at [upstash.com](https://upstash.com/)
2. Create a new Redis database
3. Navigate to the REST API section in your database dashboard
4. Copy the REST URL and token
5. Set environment variables in your `.env.local` file:
   ```
   UPSTASH_REDIS_REST_URL=https://your-region-12345.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-upstash-token
   ```

## Alternative Redis Services

If you prefer traditional Redis services, you can modify the cache implementation to use ioredis:

### Redis Cloud

- **Free Tier**: 30MB storage, unlimited requests
- **Setup**: https://redis.com/try-free/

### Railway Redis

- **Free Tier**: $5 credit per month
- **Setup**: https://railway.app/

_Note: These services require connection-based Redis clients and may not be optimal for serverless environments._

## Local Development

For local development with Upstash, simply use your Upstash credentials. No local Redis installation needed!

Alternatively, for traditional Redis development:

1. **Use Docker Redis**:

   ```bash
   docker run -d -p 6379:6379 redis:alpine
   ```

2. **Install Redis locally**:

   ```bash
   # macOS
   brew install redis
   redis-server

   # Ubuntu/Debian
   sudo apt install redis-server
   ```

## Fallback Behavior

If Upstash Redis is not available or connection fails, the application automatically falls back to in-memory caching. This ensures the application continues to work even without Redis.

## Cache Performance

With Upstash Redis:

- Persistent cache across server restarts
- Shared cache across multiple server instances
- Automatic expiration handling (TTL)
- Better memory management
- Serverless-optimized (no connection pooling needed)
- REST-based API for reliability

Without Redis (in-memory):

- Cache lost on server restart
- Each server instance has its own cache
- Manual cleanup required
- Limited by server memory

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Upstash Redis details:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your Upstash connection details:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
UPSTASH_REDIS_REST_URL=https://your-region-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

## Why Upstash?

- **Serverless-First**: No connection management needed
- **REST API**: Works perfectly with Next.js API routes
- **Automatic Scaling**: Handles traffic spikes without configuration
- **Global Edge**: Low latency worldwide
- **Simple Integration**: No complex Redis client setup
