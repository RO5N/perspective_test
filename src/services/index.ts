import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    if (dev) {
      console.error('✉️ ', error);
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (dev) {
      console.info('📩 ', response);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
    }
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      throw new axios.Cancel(error.response);
    }
    if (error.response && error.response.status === 429) {
      throw new axios.Cancel('Rate Limit');
    }
    if (error.response && error.response.data) {
      if (dev) {
        console.error('Error: ', error.response.data.error);
      }

      return Promise.reject(error.response.data);
    }
    if (dev) {
      console.error('📩 ', error);
    }
    return Promise.reject(error.message);
  },
);

import questions from './questions';
import answers from './answers';

const questionSVC = questions(api);
const answerSVC = answers(api);

export { questionSVC, answerSVC };
