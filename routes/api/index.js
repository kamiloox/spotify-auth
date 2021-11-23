const express = require('express');
const catchAllRoutes = require('./catchAllRoutes');
const recommendationsRoute = require('./recommendations');
const isAuthorisedMiddleware = require('./isAuthorised');

const apiRouter = express.Router();

apiRouter.use(isAuthorisedMiddleware);
apiRouter.get('/recommendations', recommendationsRoute);
apiRouter.all('*', catchAllRoutes);

module.exports = apiRouter;
