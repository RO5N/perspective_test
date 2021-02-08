import { queryCallback } from 'mysql';
import { connection, asyncQuery } from '../config/mysql';

export default {
  getUser: async (email: string) => {
    try {
      const result = await asyncQuery(`SELECT * FROM users WHERE email = '${email}'`);

      return result;
    } catch (_error) {}
  },
  insertUser: (email: any, callback: queryCallback) => {
    connection.query(`INSERT INTO users (email) VALUES ('${email}')`, callback);
  },
};
