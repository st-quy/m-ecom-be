import * as redisStore from 'cache-manager-redis-store';

export const redisCacheConfig = {
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: 60,
};
