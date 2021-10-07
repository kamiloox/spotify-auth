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

  if (!req.query.refresh_token)
    return res.json({
      error: {
        status: 403,
        message: 'Request unauthorised',
      },
    });

  axios
    .post(baseURL, params.toString(), { headers })
    .then(({ data, status }) => {
      const accessTokenMaxAge = secondsToMiliseconds(data.expires_in);

      res.cookie('access_token', data.access_token, {
        httpOnly: true,
        maxAge: accessTokenMaxAge,
      });
      res.cookie('is_authenticated', 'true', {
        maxAge: accessTokenMaxAge,
      });

      if (req.query.redirect_uri) res.redirect(req.query.redirect_uri);
      else res.status(status).json(data);
    })
    .catch(({ response: { status, data } }) => {
      res.status(status).json(data);
    });
};
