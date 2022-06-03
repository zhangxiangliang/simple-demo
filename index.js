import { connectDatabase, disconnectDatabase, createRaw } from './database/index.js';

const main = () => {
  connectDatabase(
    () => console.log('在创建数据库的时候，我要做某件事情'),
    () => console.log('在运行数据库的时候，我要做某件事情'),
  );

  try {
    createRaw('books', { id: 3, title: 'Hello world', author: "Mi" });
  } catch (error) {
    console.log(error.message);
  }

  disconnectDatabase(() => console.log('在关闭数据库的时候，我要做某件事情'));
}

main();


