// Load environment variables first before anything else
require('dotenv').config();

const express    = require('express');
const session    = require('express-session');
const flash      = require('connect-flash');
const path       = require('path');
const connectDB  = require('./config/db');

const app = express();
const ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

// --- Connect to MongoDB ---
connectDB();

// --- View Engine: EJS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Body Parser: read form data ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- Static Files: css, js, images ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Session Setup ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// --- Flash Messages ---
app.use(flash());

// --- Global Variables for flash messages ---
// Makes flash messages available in all EJS views automatically
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.user        = req.session.user || null;
  next();
});

// --- Routes (will be filled in later phases) ---
app.use('/auth', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/teacher', require('./routes/teacherRoutes'));
app.use('/student', require('./routes/studentRoutes'));
app.use('/exam',    require('./routes/examRoutes'));

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
