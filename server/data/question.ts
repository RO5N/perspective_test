import { asyncQuery } from '../config/mysql';

export default {
  getStatus: async () => {
    try {
      const result = await asyncQuery('SELECT * FROM questions');

      return result;
    } catch (_error) {}
  },
};
