import { connectDatabase, disconnectDatabase } from './database/index.js';

const main = () => {
  connectDatabase();
  disconnectDatabase();
}

main();


