import server from './server';
import errorHandler from 'errorhandler';
import { NextFunction } from 'express';
import { logger } from './util/logger';

if (process.env.NODE_ENV != 'production') server.use(errorHandler()); // Error Handler. Provides full stack

server.use((err: Error, req: any, _res: any, next: NextFunction) => {
  // Winston logger
  logger.error(`${req.method} ${req.originalUrl}: `, err);
  next();
});

export default server.listen(server.get('port'), () => {
  // Start Express server
  console.log('  server is running at http://localhost:%d in %s mode', server.get('port'), server.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
