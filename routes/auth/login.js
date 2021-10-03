module.exports = (req, res) => {
  const baseURL = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: process.env.SCOPES,
    redirect_uri: process.env.REDIRECT_URI,
  });

  res.redirect(`${baseURL}?${params}`);
};
