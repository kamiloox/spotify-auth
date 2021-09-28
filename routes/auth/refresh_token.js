const axios = require('axios');

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
      res.json(data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
};
