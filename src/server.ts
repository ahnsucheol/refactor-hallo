import 'dotenv/config';

import createApp from './app';
import { myDataSource } from './configs/db.config';

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized.');
  })
  .catch(err => {
    console.error('Data Source initiate failed: ', err);
  });

const app = createApp();

const serverPort = process.env.SERVER_PORT;

app.listen(serverPort, () => {
  console.log('Server is running on port:', serverPort);
});
