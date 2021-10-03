// middleware
module.exports = (req, res, next) => {
  if (req.cookies.access_token) {
    res.locals.authHeader = `Bearer ${req.cookies.access_token}`;
    next();
  } else if (req.cookies.refresh_token)
    res.redirect(`/auth/refresh_token?redirect_uri=${req.originalUrl}`);
  else
    res.json({
      error: {
        status: 403,
        message: 'Request unauthorised',
      },
    });
};
