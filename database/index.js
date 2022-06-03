import fs from 'fs'; // File System

const DATABASE_PATH = './database/index.json';
const originDatabaseData = fs.readFileSync(DATABASE_PATH).toString();
const db = JSON.parse(originDatabaseData);

export const compareFnById = (x, y) => x.id < y.id ? -1 : 1;

export const fixDatabase = () => {
  const keys = Object.keys(db);
  keys.forEach((key) => db[key] = db[key].sort(compareFnById));
}

export const connectDatabase = () => {
  console.log('database is setup');
  fixDatabase();
  console.log('database is running');
};

export const disconnectDatabase = () => {
  console.log('database is stopping');
  fixDatabase();
  const newDatabaseData = JSON.stringify(db, null, 2);
  fs.writeFileSync(DATABASE_PATH, newDatabaseData);
  console.log('database is stopped');
}
