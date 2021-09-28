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
    .then(({ data, status }) => {
      res.cookie('access_token', data.access_token, {
        httpOnly: true,
        maxAge: secondsToMiliseconds(data.expires_in),
      });

      if (req.query.redirect_uri) res.redirect(req.query.redirect_uri);
      else res.status(status).json(data);
    })
    .catch(({ response: { status, data } }) => {
      res.status(status).json(data);
    });
};
