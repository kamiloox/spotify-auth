const axios = require('axios');

module.exports = (req, res) => {
  const baseURL = 'https://api.spotify.com/v1';

  const axiosConfig = {
    method: req.method,
    baseURL,
    url: req.url,
    params: req.query,
    headers: {
      Authorization: res.locals.authHeader,
    },
  };

  const hasJSONBody = Object.keys(req.body).length >= 1;
  if (hasJSONBody) axiosConfig.data = req.body;

  axios(axiosConfig)
    .then(({ status, data }) => {
      res.status(status).json(data);
    })
    .catch(({ response: { status, data } }) => {
      res.status(status).json(data);
    });
};
