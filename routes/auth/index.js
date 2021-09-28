const express = require('express');
const loginRoute = require('./login');
const callbackRoute = require('./callback');
const refreshTokenRoute = require('./refresh_token');
const isLoggedRoute = require('./is_logged');

const authRouter = express.Router();

authRouter.get('/login', loginRoute);
authRouter.get('/callback', callbackRoute);
authRouter.get('/refresh_token', refreshTokenRoute);
authRouter.get('/is_logged', isLoggedRoute);

module.exports = authRouter;
