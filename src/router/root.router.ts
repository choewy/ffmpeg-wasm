import { Router } from 'express';
import { RouterFunction } from './types';

const rootRouter: RouterFunction = () => {
  const prefix = '/';
  const router = Router();

  router.get('/', (_, res) => {
    return res.status(200).send({
      health: true,
    });
  });

  return [prefix, router];
};

export default rootRouter;
