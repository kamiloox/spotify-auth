module.exports = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const baseURL = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.REDIRECT_URI,
  });

  res.redirect(`${baseURL}?${params}`);
};
