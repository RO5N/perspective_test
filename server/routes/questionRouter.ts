import express from 'express';
import Questions from '../data/question';

export default express.Router().get('/', async (_req: any, res: any, _next: any) => {
  try {
    const result: any = await Questions.getStatus();

    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json(error);
  }
});
