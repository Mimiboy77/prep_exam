// Load environment variables first before anything else
require('dotenv').config();

const express    = require('express');
const session    = require('express-session');
const flash      = require('connect-flash');
const path       = require('path');
const ejsLayouts = require('express-ejs-layouts');
const connectDB  = require('./config/db');

const app = express();

// --- Connect to MongoDB ---
connectDB();

// --- View Engine: EJS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- EJS Layouts ---
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

// --- Body Parser: read form data ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- Static Files: css, js, images ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Session Setup ---
app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false
}));

// --- Flash Messages ---
app.use(flash());

// --- Global Variables ---
// Makes flash messages and user session available in all EJS views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.user        = req.session.user || null;
  next();
});

// --- Default Home Route ---
// Redirect root to login page
app.get('/', (req, res) => {
  if (req.session.user) {
    // If already logged in redirect to correct dashboard
    if (req.session.user.role === 'admin')   return res.redirect('/admin/dashboard');
    if (req.session.user.role === 'teacher') return res.redirect('/teacher/dashboard');
    if (req.session.user.role === 'student') return res.redirect('/student/dashboard');
  }
  res.redirect('/auth/login');
});

// --- Routes ---
app.use('/auth',    require('./routes/authRoutes'));
app.use('/admin',   require('./routes/adminRoutes'));
app.use('/teacher', require('./routes/teacherRoutes'));
app.use('/student', require('./routes/studentRoutes'));
app.use('/exam',    require('./routes/examRoutes'));

// --- 404 Handler ---
// Catches any route that does not exist
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// --- Global Error Handler ---
// Catches any unexpected server errors
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).render('500', { title: 'Server Error' });
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});