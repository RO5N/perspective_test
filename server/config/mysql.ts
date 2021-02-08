import { createPool } from 'mysql';
import { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER } from '../util/secrets';
export const connection = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  charset: 'utf8mb4',
  multipleStatements: true,
});
export async function asyncQuery(queryString: string, values?: any): Promise<{ changedRows?: number }> {
  return new Promise((resolve, reject) => {
    connection.query(queryString, values, (error: any, rows: any) => {
      if (error) return reject(error);
      return resolve(rows);
    });
  });
}
