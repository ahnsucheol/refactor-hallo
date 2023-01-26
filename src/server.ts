import 'dotenv/config';

import createApp from './app';
import { myDataSource } from './configs/db.config';
import { redisClient } from './configs/redis.config';

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized.');
  })
  .catch(err => {
    console.error('Data Source initiate failed: ', err);
  });

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', err => {
  console.log('Redis client err:', err);
});

redisClient.connect().then();

const app = createApp();

const serverPort: number = Number(process.env.SERVER_PORT);

app.listen(serverPort, () => {
  console.log('Server is running on port:', serverPort);
});
