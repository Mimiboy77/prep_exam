// Checks if user is logged in before allowing access to any protected route
const isLoggedIn = (req, res, next) => {
  // If session has a user, they are logged in, continue
  if (req.session.user) return next();

  // If not logged in, flash a message and redirect to login
  req.flash('error_msg', 'Please log in to access this page');
  res.redirect('/auth/login');
};

module.exports = { isLoggedIn };