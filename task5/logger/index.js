const winston = require('winston');

class CommonLogger {
  constructor(serviceName, precessEnv) {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: serviceName },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
    if (precessEnv !== 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
    return logger;
  }
}

module.exports = {
  CommonLogger
};
