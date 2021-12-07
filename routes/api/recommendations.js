// This route is a workaround for /recommendations spotify api because preview_url is sometimes null in http respond

const axios = require('axios');

const requestSeveralTracks = (res, tracks, market = null) => {
  const baseURL = `https://api.spotify.com/v1/tracks`;

  const ids = tracks.map((track) => track.id);

  return axios({
    baseURL,
    params: {
      ids: ids.join(','),
      market,
    },
    headers: {
      Authorization: res.locals.authHeader,
    },
  });
};

module.exports = (req, res) => {
  const baseURL = 'https://api.spotify.com/v1';

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
      if (data.tracks.length > 0)
        requestSeveralTracks(res, data.tracks, req.query?.market).then((newRes) => {
          res.status(status).json(newRes.data.tracks);
        });
      else res.status(status).json([]);
    })
    .catch(({ response: { status, data } }) => {
      res.status(status).json(data);
    });
};
