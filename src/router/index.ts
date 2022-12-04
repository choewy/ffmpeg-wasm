export * from './types';

import rootRouter from './root.router';
import fileRouter from './file.router';

export const routers = [rootRouter, fileRouter];
