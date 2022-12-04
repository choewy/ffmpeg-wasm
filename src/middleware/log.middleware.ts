import { MiddlewareFunction } from './types';

const logMiddleware: MiddlewareFunction = (req, _, next) => {
  console.table([
    {
      time: new Date().toLocaleString(),
      ip: req.ip,
      method: req.method,
      path: req.path,
    },
  ]);

  next();
};

export default logMiddleware;
