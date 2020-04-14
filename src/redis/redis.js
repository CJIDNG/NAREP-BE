import Debug from 'debug';
import dotenv from 'dotenv';

const redis = require('redis');

// const client = redis.createClient({
//   host: process.env.REDIS_HOST || '127.0.0.1',
//   port: process.env.REDIS_PORT || 6379,
// });
const client = redis.createClient(6379);
dotenv.config();
const debug = Debug(process.env.DEBUG);

client.on('error', (err) => {
  debug(`Error ${err}`);
});


export default client;
