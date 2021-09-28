// middleware
module.exports = (req, res, next) => {
  if (req.cookies.access_token) {
    res.locals.authHeader = `Bearer ${req.cookies.access_token}`;
    next();
  } else res.status(403).json({ error: 'Forbidden, no access_token' });
};
