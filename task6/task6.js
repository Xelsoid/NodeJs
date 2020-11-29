const express = require('express');
const app = express();
const PORT = 3003;
const bodyParser = require('body-parser');
const router = require('./routers/index');
const { CommonLogger } = require('./logger');
const logger = new CommonLogger('logger', process.env.NODE_ENV);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.use((req, res, next) => {
  if (req.url.length > 1 && !/\./.test(req.url)) {
    logger.info('service logger',  {'service': req.url, 'params': req.body});
  }
  next();
});
app.use('/', router);
app.use((err, req, res, next) => {
  const errorMessage = 'Something gone wrong';
  logger.error(errorMessage, { success: false });
  res.status(500).json({ success: false, message: errorMessage });
  next();
});

process.on('uncaughtException', (error) => {
  logger.error(error.message, { success: false });
});

process.on('unhandledRejection', (err, promise) => {
  logger.error(`Unhandled rejection (promise: ${promise}, reason: ${err})`, { success: false });
});
