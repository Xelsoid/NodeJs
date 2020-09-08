const express = require('express');

const app = express();
const PORT = 3003;

const bodyParser = require('body-parser');
const dirty = require('dirty');

const db = dirty('user.db');
const router = require('./routers/index');

db.set('users', []);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.use('/', router);
