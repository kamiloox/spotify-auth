const express = require('express');
const catchAllRoutes = require('./catchAllRoutes');
const isAuthorisedMiddleware = require('./isAuthorised');

const apiRouter = express.Router();

apiRouter.use(isAuthorisedMiddleware);
apiRouter.all('*', catchAllRoutes);

module.exports = apiRouter;
