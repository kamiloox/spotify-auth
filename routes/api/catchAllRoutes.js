const axios = require('axios');

module.exports = (req, res) => {
  const baseURL = 'https://api.spotify.com/v1';

  axios({
    method: req.method,
    baseURL,
    url: req.url,
    params: req.query,
    body: req.body,
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
