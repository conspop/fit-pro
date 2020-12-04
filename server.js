const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// load the env vars
require('dotenv').config();

const app = express();

require('./config/database');

var usersRouter = require('./routes/api/users');
var contractsRouter = require('./routes/api/contracts')
var singlesRouter = require('./routes/api/singles')

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/contracts', contractsRouter);
app.use('/api/singles', singlesRouter);
app.use('/api/users', usersRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});