require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const app = express();
const port = 8080;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('<a href="/auth/login">login to spotify</a>');
});

app.get('/app', (req, res) => {
  res.send('succedded in authorizing user');
});

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`app is working on port: ${port}`);
});
