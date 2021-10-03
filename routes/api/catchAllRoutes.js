const axios = require('axios');

module.exports = (req, res) => {
  const baseURL = 'https://api.spotify.com/v1';

  console.log(req.url);
  axios({
    method: req.method,
    baseURL,
    url: req.url,
    params: req.query,
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
