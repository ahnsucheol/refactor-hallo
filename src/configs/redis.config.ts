import { createClient } from 'redis';

const redisClient = createClient({
  legacyMode: true,
});

export { redisClient };
