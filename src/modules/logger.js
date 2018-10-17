import winston from 'winston';

export const log = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: () => {
        return new Date();
      },
      format: winston.format.json(),
      level: process.env.LOG_LEVEL || 'info',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

export const stream = {
  write: (message) => {
    log.info(`[${new Date()}]`, message);
  }
};
