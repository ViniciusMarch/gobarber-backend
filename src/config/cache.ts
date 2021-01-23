import { RedisOptions } from 'ioredis'; // Consigo resgatar todas as opções do redis

interface ICacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;
