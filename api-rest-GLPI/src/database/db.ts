import mysql from 'mysql2/promise';

export const createConnection = async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_glpi'
  });
  return conn;
};
