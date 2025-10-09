# Redis Cache Setup

This application supports both Redis and in-memory caching for weather data. Redis is recommended for production use.

## Free Redis Services

### 1. Upstash Redis (Recommended)

- **Free Tier**: 10,000 requests per day
- **Setup**: https://upstash.com/
- Steps:
  1. Sign up at upstash.com
  2. Create a new Redis database
  3. Copy the connection details
  4. Set environment variables:
     ```
     REDIS_HOST=your-region-12345.upstash.io
     REDIS_PORT=6379
     REDIS_PASSWORD=your-upstash-token
     REDIS_TLS=true
     ```

### 2. Redis Cloud

- **Free Tier**: 30MB storage, unlimited requests
- **Setup**: https://redis.com/try-free/
- Steps:
  1. Sign up at redis.com
  2. Create a new database
  3. Note the endpoint and password
  4. Set environment variables:
     ```
     REDIS_HOST=redis-12345.c123.us-east-1-1.ec2.cloud.redislabs.com
     REDIS_PORT=12345
     REDIS_PASSWORD=your-password
     REDIS_TLS=true
     ```

### 3. Railway Redis

- **Free Tier**: $5 credit per month
- **Setup**: https://railway.app/
- Steps:
  1. Sign up at railway.app
  2. Create a new project
  3. Add Redis service
  4. Copy connection details from service variables

## Local Development

For local development, you can:

1. **Use Docker Redis**:

   ```bash
   docker run -d -p 6379:6379 redis:alpine
   ```

   Then set:

   ```
   REDIS_HOST=localhost
   REDIS_PORT=6379
   # No password or TLS needed for local
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

If Redis is not available or connection fails, the application automatically falls back to in-memory caching. This ensures the application continues to work even without Redis.

## Cache Performance

With Redis:

- Persistent cache across server restarts
- Shared cache across multiple server instances
- Automatic expiration handling
- Better memory management

Without Redis (in-memory):

- Cache lost on server restart
- Each server instance has its own cache
- Manual cleanup required
- Limited by server memory

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Redis details:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your Redis connection details.
