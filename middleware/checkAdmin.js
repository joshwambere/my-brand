module.exports = checkAdmin = (req, res, next) => {
  if (req.tokenData.isadmin) {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Only admins can access this',
    });
  }
};
