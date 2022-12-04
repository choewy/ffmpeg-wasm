export * from './types';

import proxyMiddleware from './proxy.middleware';
import logMiddleware from './log.middleware';

export const middlewares = [proxyMiddleware, logMiddleware];
