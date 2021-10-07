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
    .then(({ data: { refresh_token, access_token, expires_in } }) => {
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: secondsToMiliseconds(3600 * 24 * 30), // expires after one month
      });

      const accessTokenMaxAge = secondsToMiliseconds(expires_in);

      res.cookie('access_token', access_token, {
        httpOnly: true,
        maxAge: accessTokenMaxAge,
      });
      res.cookie('is_authenticated', 'true', {
        maxAge: accessTokenMaxAge,
      });

      res.redirect(process.env.FRONTEND_URL);
    })
    .catch(({ response: { status, data } }) => {
      res.status(status).json(data);
    });
};
