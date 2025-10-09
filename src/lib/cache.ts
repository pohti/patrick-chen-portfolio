import Redis from 'ioredis';

// Redis cache for weather data
interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

class RedisCache {
  private static instance: RedisCache;
  private redis: Redis;
  private fallbackCache = new Map<string, CacheItem<unknown>>(); // Fallback in-memory cache
  private isRedisConnected = false;

  // Singleton pattern to ensure one cache instance across the server
  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  private constructor() {
    // Initialize Redis connection
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      // For free Redis services like Upstash or Redis Cloud
      connectTimeout: 10000,
      lazyConnect: true,
      maxRetriesPerRequest: 3,
      // Optional: Enable TLS for secure connections (common with cloud Redis)
      ...(process.env.REDIS_TLS === 'true' && {
        tls: {
          rejectUnauthorized: false,
        },
      }),
    });

    // Handle Redis connection events
    this.redis.on('connect', () => {
      console.log('🔗 Connected to Redis');
      this.isRedisConnected = true;
    });

    this.redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error.message);
      this.isRedisConnected = false;
    });

    this.redis.on('close', () => {
      console.log('🔌 Redis connection closed');
      this.isRedisConnected = false;
    });

    // Start cleanup interval for fallback cache
    setInterval(
      () => {
        this.cleanupFallbackCache();
      },
      10 * 60 * 1000
    ); // Clean every 10 minutes
  }

  async set<T>(key: string, data: T, ttlMinutes: number = 30): Promise<void> {
    const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
    const cacheItem: CacheItem<T> = { data, expiresAt };

    try {
      if (this.isRedisConnected) {
        // Store in Redis with TTL in seconds
        await this.redis.setex(key, ttlMinutes * 60, JSON.stringify(cacheItem));
        console.log(
          `🗄️ Redis: Cached data for key: ${key} (expires in ${ttlMinutes}min)`
        );
      } else {
        throw new Error('Redis not connected');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.warn(
        `⚠️ Redis SET failed for ${key}, falling back to memory:`,
        errorMessage
      );
      // Fallback to in-memory cache
      this.fallbackCache.set(key, cacheItem);
      console.log(
        `🗄️ Memory: Cached data for key: ${key} (expires in ${ttlMinutes}min)`
      );
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.isRedisConnected) {
        const result = await this.redis.get(key);
        if (result) {
          const item: CacheItem<T> = JSON.parse(result);
          // Redis TTL handles expiration, but double-check for safety
          if (Date.now() <= item.expiresAt) {
            console.log(`✅ Redis: Cache HIT for key: ${key}`);
            return item.data;
          } else {
            await this.redis.del(key);
            console.log(`⏰ Redis: Cache EXPIRED for key: ${key}`);
            return null;
          }
        } else {
          console.log(`🔍 Redis: Cache MISS for key: ${key}`);
          return null;
        }
      } else {
        throw new Error('Redis not connected');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.warn(
        `⚠️ Redis GET failed for ${key}, falling back to memory:`,
        errorMessage
      );
      // Fallback to in-memory cache
      const item = this.fallbackCache.get(key);

      if (!item) {
        console.log(`🔍 Memory: Cache MISS for key: ${key}`);
        return null;
      }

      if (Date.now() > item.expiresAt) {
        this.fallbackCache.delete(key);
        console.log(`⏰ Memory: Cache EXPIRED for key: ${key}`);
        return null;
      }

      console.log(`✅ Memory: Cache HIT for key: ${key}`);
      return item.data as T;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      if (this.isRedisConnected) {
        await this.redis.del(key);
        console.log(`🗑️ Redis: Deleted cache key: ${key}`);
      } else {
        throw new Error('Redis not connected');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.warn(
        `⚠️ Redis DELETE failed for ${key}, falling back to memory:`,
        errorMessage
      );
      this.fallbackCache.delete(key);
      console.log(`🗑️ Memory: Deleted cache key: ${key}`);
    }
  }

  async clear(): Promise<void> {
    try {
      if (this.isRedisConnected) {
        await this.redis.flushdb();
        console.log(`🧹 Redis: Cleared all cache`);
      } else {
        throw new Error('Redis not connected');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.warn(
        `⚠️ Redis CLEAR failed, falling back to memory:`,
        errorMessage
      );
      const size = this.fallbackCache.size;
      this.fallbackCache.clear();
      console.log(`🧹 Memory: Cleared ${size} items from cache`);
    }
  }

  // Clean up expired entries from fallback cache
  private cleanupFallbackCache(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.fallbackCache.forEach((item: CacheItem<unknown>, key: string) => {
      if (now > item.expiresAt) {
        keysToDelete.push(key);
      }
    });

    if (keysToDelete.length > 0) {
      keysToDelete.forEach((key) => this.fallbackCache.delete(key));
      console.log(
        `🧽 Cleaned up ${keysToDelete.length} expired fallback cache entries`
      );
    }
  }

  // Get cache statistics
  async getStats() {
    try {
      if (this.isRedisConnected) {
        const info = await this.redis.info('keyspace');
        const dbMatch = info.match(/db0:keys=(\d+)/);
        const redisKeys = dbMatch ? parseInt(dbMatch[1]) : 0;

        return {
          total: redisKeys + this.fallbackCache.size,
          redis: redisKeys,
          fallback: this.fallbackCache.size,
          valid: redisKeys + this.getFallbackValidCount(),
          expired: 0, // Redis handles expiration automatically
          source: 'redis' as const,
        };
      } else {
        throw new Error('Redis not connected');
      }
    } catch {
      // Fallback to memory cache stats
      const now = Date.now();
      let validItems = 0;
      let expiredItems = 0;

      this.fallbackCache.forEach((item: CacheItem<unknown>) => {
        if (now > item.expiresAt) {
          expiredItems++;
        } else {
          validItems++;
        }
      });

      return {
        total: this.fallbackCache.size,
        redis: 0,
        fallback: this.fallbackCache.size,
        valid: validItems,
        expired: expiredItems,
        source: 'memory' as const,
      };
    }
  }

  private getFallbackValidCount(): number {
    const now = Date.now();
    let validItems = 0;

    this.fallbackCache.forEach((item: CacheItem<unknown>) => {
      if (now <= item.expiresAt) {
        validItems++;
      }
    });

    return validItems;
  }
}

// Export singleton instance - this will be shared across all server requests
const weatherCache = RedisCache.getInstance();

export default weatherCache;
