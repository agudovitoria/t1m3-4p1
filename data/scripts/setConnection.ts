import { createConnection } from 'typeorm';

export const setConnection = async () => createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 't1m3-4pp',
});
