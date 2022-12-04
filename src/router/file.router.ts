import { Router } from 'express';
import { RouterFunction } from './types';

const fileRouter: RouterFunction = () => {
  const prefix = '/file';
  const router = Router();

  router.get('/', (_, res) => {
    return res.download('./temp/20221204164523/concat.ts');
  });

  return [prefix, router];
};

export default fileRouter;
