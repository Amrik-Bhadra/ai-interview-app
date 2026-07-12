import { createClient } from 'redis';

let redisClient;

export async function connectRedis() {
    redisClient = createClient({
        username: 'default',
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10), // must be a number
        },
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    redisClient.on('connect', () => console.log('🔄 Connecting to Redis...'));
    redisClient.on('ready', () => console.log('✅ Redis Connected'));

    await redisClient.connect();
    return redisClient;
}

export { redisClient };