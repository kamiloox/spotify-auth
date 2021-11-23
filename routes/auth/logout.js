module.exports = (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.cookie('is_authenticated', 'false');
  res.json({});
};
