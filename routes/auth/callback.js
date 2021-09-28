const axios = require('axios');
const { secondsToMiliseconds } = require('../../utils');

module.exports = (req, res) => {
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
      });

      res.cookie('refresh_token', data.refresh_token, {
        httpOnly: true,
        maxAge: secondsToMiliseconds(3600 * 24 * 30), // expires after one month
      });

      res.redirect(`${process.env.FRONTEND_URL}?${params}`);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
};
