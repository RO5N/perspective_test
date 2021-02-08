import { queryCallback } from 'mysql';
import { connection, asyncQuery } from '../config/mysql';

export default {
  insertAnswer: (question: number, answer: number, user: string, callback: queryCallback) => {
    connection.query(
      `INSERT INTO answers (question, answer, user) VALUES ('${question}', '${answer}', '${user}')`,
      callback,
    );
  },
  getAnswer: async (email: string) => {
    try {
      const result = await asyncQuery(
        `SELECT 
            q.id, 
            q.title, 
            q.a, 
            q.b, 
            q.direction, 
            a.answer 
        FROM questions q, answers a 
        WHERE q.id = a.question AND a.user = '${email}'`,
      );

      return result;
    } catch (_error) {}
  },
};
