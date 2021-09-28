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
    .then(({ data }) => {
      res.json({ data });
    })
    .catch((error) => {
      res.json(error.response.data);
    });
};
