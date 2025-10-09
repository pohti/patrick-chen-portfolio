// Server-side in-memory cache for weather data
interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

class ServerMemoryCache {
  private static instance: ServerMemoryCache;
  private cache = new Map<string, CacheItem<any>>();
  
  // Singleton pattern to ensure one cache instance across the server
  public static getInstance(): ServerMemoryCache {
    if (!ServerMemoryCache.instance) {
      ServerMemoryCache.instance = new ServerMemoryCache();
      
      // Start cleanup interval only once
      setInterval(() => {
        ServerMemoryCache.instance.cleanup();
      }, 10 * 60 * 1000); // Clean every 10 minutes
    }
    return ServerMemoryCache.instance;
  }
  
  set<T>(key: string, data: T, ttlMinutes: number = 30): void {
    const expiresAt = Date.now() + (ttlMinutes * 60 * 1000);
    this.cache.set(key, { data, expiresAt });
    console.log(`🗄️ Cached data for key: ${key} (expires in ${ttlMinutes}min)`);
  }
  
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      console.log(`🔍 Cache MISS for key: ${key}`);
      return null;
    }
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      console.log(`⏰ Cache EXPIRED for key: ${key}`);
      return null;
    }
    
    console.log(`✅ Cache HIT for key: ${key}`);
    return item.data;
  }
  
  delete(key: string): void {
    this.cache.delete(key);
    console.log(`🗑️ Deleted cache key: ${key}`);
  }
  
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`🧹 Cleared ${size} items from cache`);
  }
  
  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.cache.forEach((item, key) => {
      if (now > item.expiresAt) {
        keysToDelete.push(key);
      }
    });
    
    if (keysToDelete.length > 0) {
      keysToDelete.forEach(key => this.cache.delete(key));
      console.log(`🧽 Cleaned up ${keysToDelete.length} expired cache entries`);
    }
  }
  
  // Get cache statistics
  getStats() {
    const now = Date.now();
    let validItems = 0;
    let expiredItems = 0;
    
    this.cache.forEach((item) => {
      if (now > item.expiresAt) {
        expiredItems++;
      } else {
        validItems++;
      }
    });
    
    return {
      total: this.cache.size,
      valid: validItems,
      expired: expiredItems,
    };
  }
}

// Export singleton instance - this will be shared across all server requests
const weatherCache = ServerMemoryCache.getInstance();

export default weatherCache;