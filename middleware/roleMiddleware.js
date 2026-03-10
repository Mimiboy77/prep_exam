// Checks if logged in user has the correct role to access a route

// --- Admin only ---
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') return next();

  // Wrong role, flash message and redirect to login
  req.flash('error_msg', 'Access denied. Admins only.');
  res.redirect('/auth/login');
};

// --- Teacher only ---
const isTeacher = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'teacher') return next();

  req.flash('error_msg', 'Access denied. Teachers only.');
  res.redirect('/auth/login');
};

// --- Student only ---
const isStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'student') return next();

  req.flash('error_msg', 'Access denied. Students only.');
  res.redirect('/auth/login');
};

module.exports = { isAdmin, isTeacher, isStudent };
