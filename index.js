const axios = require('axios');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('<a href="/login">login to spotify</a>');
});

app.get('/app', (req, res) => {
  res.send('succedded in authorizing user');
});

app.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const baseURL = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.REDIRECT_URI,
  });

  res.redirect(`${baseURL}?${params}`);
});

app.get('/callback', (req, res) => {
  const baseURL = 'https://accounts.spotify.com/api/token';

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  axios
    .post(baseURL, params.toString(), { headers })
    .then(({ data }) => {
      const params = new URLSearchParams({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      res.redirect(`${process.env.FRONTEND_URL}?${params}`);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

app.get('/refresh_token', (req, res) => {
  const baseURL = 'https://accounts.spotify.com/api/token';

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: req.query.refresh_token,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  axios
    .post(baseURL, params.toString(), { headers })
    .then(({ data }) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

app.listen(port, () => {
  console.log(`app is working on port: ${port}`);
});
