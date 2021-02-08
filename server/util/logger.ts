import { createLogger, format, transports } from 'winston';

const print = format.printf((info) => {
  const log = `${info.timestamp} ${info.level}: ${info.message}`;

  return info.stack ? `${log}\n${info.stack}` : log;
});

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({
          format: 'YYYY-MM-DDTHH:mm:ss',
        }),
        format.colorize(),
        print,
      ),
    }),
    new transports.File({
      filename: 'debug.log',
      level: 'debug',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({
          format: 'YYYY-MM-DDTHH:mm:ss',
        }),
        print,
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
} else {
  logger.debug('Logging initialized at error level');
}
