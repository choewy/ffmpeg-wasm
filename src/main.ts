import { serverConfig } from './config';
import { middlewares } from './middleware';
import { routers } from './router';
import { server } from './server';

const bootstrap = async () => {
  const { port, host } = serverConfig;

  server(middlewares, routers).listen(port, host, 1);
};

bootstrap();
