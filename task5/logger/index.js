const winston = require('winston');

class CommonLogger {
  constructor(serviceName, precessEnv) {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: serviceName },
      transports: [
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
