module.exports = (req, res) => {
  if (req.cookies.access_token) res.json({ is_logged: true });
  else res.json({ is_logged: false });
};
