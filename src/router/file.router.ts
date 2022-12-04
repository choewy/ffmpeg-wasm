import { Router } from 'express';
import { RouterFunction } from './types';

const fileRouter: RouterFunction = () => {
  const prefix = '/file';
  const router = Router();

  router.get('/', (_, res) => {
    return res.download('./temp/concat.ts');
  });

  return [prefix, router];
};

export default fileRouter;
