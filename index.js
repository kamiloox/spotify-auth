require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const morgan = require('morgan');
const app = express();
const port = 8080;

if (process.env.DEVELOPMENT) app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: new URL(process.env.FRONTEND_URL).origin }));

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`api is working on port: ${port}`);
});
