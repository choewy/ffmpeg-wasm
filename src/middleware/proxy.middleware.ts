import { MiddlewareFunction } from './types';

const proxyMiddleware: MiddlewareFunction = (_, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  next();
};

export default proxyMiddleware;
