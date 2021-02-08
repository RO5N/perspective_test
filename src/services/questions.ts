import { AxiosPromise } from 'axios';

type API = {
  get: (url: string) => AxiosPromise;
  post: (url: string, payload: any) => AxiosPromise;
  patch: (url: string, payload: any) => AxiosPromise;
};

const Questions = (
  api: API,
): {
  getAllQuestions: () => AxiosPromise;
} => {
  const getAllQuestions = (): AxiosPromise => api.get('/api/questions');

  return {
    getAllQuestions,
  };
};

export default Questions;
