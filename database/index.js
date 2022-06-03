import fs from 'fs'; // File System

const DATABASE_PATH = './database/index.json';
const originDatabaseData = fs.readFileSync(DATABASE_PATH).toString();
const db = JSON.parse(originDatabaseData);

export const compareFnById = (x, y) => x.id < y.id ? -1 : 1;

export const fixDatabase = () => {
  const keys = Object.keys(db);
  keys.forEach((key) => db[key] = db[key].sort(compareFnById));
}

export const connectDatabase = (
  setupCallback = () => '',
  runningCallback = () => ''
) => {
  //
  console.log('database is setup');
  setupCallback();

  //
  fixDatabase();

  ///
  console.log('database is running');
  runningCallback();
};

export const disconnectDatabase = (stoppedCallback = () => '') => {
  //
  console.log('database is stopping');
  fixDatabase();

  //
  const newDatabaseData = JSON.stringify(db, null, 2);
  fs.writeFileSync(DATABASE_PATH, newDatabaseData);

  //
  console.log('database is stopped');
  stoppedCallback();
}

export const createRaw = (name = '', raw = {}) => {
  if (name === '') throw new Error('name is undefined');
  if (Object.keys(raw).length === 0) throw new Error('raw is empty object');

  const current = db[name];
  const last = current[current.length - 1];

  if (raw.id) {
    const has = current.find(cur => cur.id === raw.id);
    if (has) throw new Error('id is exist');
  }


  const id = current.length === 0 ? 1 : last.id + 1;

  const newRaw = { ...raw, id };
  db[name] = [...current, newRaw];
}