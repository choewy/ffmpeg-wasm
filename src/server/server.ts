import * as cors from 'cors';
import * as express from 'express';

import { serverConfig } from '../config';
import { MiddlewareFunction } from '../middleware';
import { RouterFunction } from '../router';

export const server = (
  middlewares: MiddlewareFunction[],
  routers: RouterFunction[],
): express.Express => {
  const { limit } = serverConfig;

  const app = express();

  app.use(express.json({ limit }));
  app.use(express.urlencoded({ limit, extended: true }));
  app.use(
    cors({
      origin: '*',
      allowedHeaders: '*',
      exposedHeaders: '*',
    }),
  );

  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  routers.forEach((routerFunction) => {
    const [prefix, router] = routerFunction();
    app.use('/api' + prefix, router);
  });

  const staticPath = process.cwd() + '/public/build';
  app.use(express.static(staticPath));

  app.get('/', (_, res) => {
    res.send(staticPath + '/index.html');
  });

  app.all('*', (_, res) => {
    res.redirect('/');
  });

  return app;
};
