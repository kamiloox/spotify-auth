module.exports = (req, res) => {
  if (req.cookies.access_token) res.json({ is_logged: true });
  else if (req.cookies.refresh_token)
    res.redirect(`/auth/refresh_token?redirect_uri=${req.originalUrl}`);
  else res.json({ is_logged: false });
};
