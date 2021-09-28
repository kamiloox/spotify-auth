const express = require('express');
const isAuthorisedMiddleware = require('./isAuthorised');
const meRoute = require('./me');

const apiRouter = express.Router();

apiRouter.use(isAuthorisedMiddleware);

apiRouter.get('/me', meRoute);

module.exports = apiRouter;
