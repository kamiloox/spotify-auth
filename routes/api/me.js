const axios = require('axios');

// get current user
module.exports = (req, res) => {
  const baseURL = 'https://api.spotify.com/v1/me';

  axios
    .get(baseURL, {
      headers: {
        Authorization: res.locals.authHeader,
      },
    })
    .then(({ status, data }) => {
      res.status(status).json(data);
    })
    .catch(({ response: { status, data } }) => {
      res.status(status).json(data);
    });
};
