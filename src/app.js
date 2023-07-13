const express = require('express');

const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');

const app = express();
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many requests from this api.Please try again later',
  legacyHeaders: false,
});

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'Api is working fine',
  });
});

// all error will come here if we done any wrong in client or server
// client error handling
app.use((req, res, next) => {
  next(createError(404, 'route not found'));
});
// server error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: 'false',
    message: err.message,
  });
});

module.exports = app;
