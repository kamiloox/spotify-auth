const axios = require('axios');
const { secondsToMiliseconds } = require('../../utils');

module.exports = (req, res) => {
  const baseURL = 'https://accounts.spotify.com/api/token';

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: req.cookies.refresh_token,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  axios
    .post(baseURL, params.toString(), { headers })
    .then(({ data }) => {
      res.cookie('access_token', data.access_token, {
        httpOnly: true,
        maxAge: secondsToMiliseconds(data.expires_in),
      });

      res.json(data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
};
