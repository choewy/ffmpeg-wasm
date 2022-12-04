import './env';

import { ServerConfigType } from './types';

export const serverConfig: ServerConfigType = {
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  limit: process.env.LIMIt,
};
