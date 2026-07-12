import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
import app from './app.js';
import { connectToDB } from './config/database.js';
import { connectRedis } from './config/redis.js';

if (process.env.NODE_ENV !== 'production') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const PORT = process.env.PORT || 3000;

async function start() {
    await connectToDB();
    await connectRedis();
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();