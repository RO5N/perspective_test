import { AxiosPromise } from 'axios';

type API = {
  get: (url: string) => AxiosPromise;
  post: (url: string, payload: any) => AxiosPromise;
  patch: (url: string, payload: any) => AxiosPromise;
};

const Questions = (
  api: API,
): {
  getAnswersByEmail: (questions: any) => AxiosPromise;
  results: (questions: any) => AxiosPromise;
} => {
  const getAnswersByEmail = (email: string): AxiosPromise => api.get('/api/answers/' + email);
  const results = (questions: any): AxiosPromise => api.post('/api/answers', questions);
  return {
    getAnswersByEmail,
    results,
  };
};

export default Questions;
