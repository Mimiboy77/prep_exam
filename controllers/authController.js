const bcrypt        = require('bcrypt');
const User          = require('../models/User');
const School        = require('../models/School');
const { generateUsername } = require('../utils/helpers');

// --- Render Login Page ---
const getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

// --- Handle Login Form Submission ---
const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/auth/login');
    }

    // Compare submitted password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/auth/login');
    }

    // Save user info in session
    req.session.user = {
      id:       user._id,
      username: user.username,
      role:     user.role,
      surname:  user.surname
    };

    // Redirect based on role
    if (user.role === 'admin')   return res.redirect('/admin/dashboard');
    if (user.role === 'teacher') return res.redirect('/teacher/dashboard');
    if (user.role === 'student') return res.redirect('/student/dashboard');

  } catch (error) {
    console.error('Login error:', error.message);
    req.flash('error_msg', 'Something went wrong. Please try again.');
    res.redirect('/auth/login');
  }
};

// --- Render Student Register Page ---
const getRegister = async (req, res) => {
  try {
    // Load schools for the dropdown
    const schools = await School.find();
    res.render('auth/register', { title: 'Student Registration', schools });
  } catch (error) {
    console.error('Register page error:', error.message);
    req.flash('error_msg', 'Something went wrong. Please try again.');
    res.redirect('/auth/login');
  }
};

// --- Handle Student Registration Form Submission ---
const postRegister = async (req, res) => {
  try {
    const { surname, firstname, studentClass, department, schoolId } = req.body;

    // Generate username from surname, class and department
    const username = generateUsername(surname, studentClass, department);

    // Default password is the student's surname (lowercased)
    const defaultPassword = surname.toLowerCase();

    // Hash the default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create new student user
    const newStudent = new User({
      surname,
      firstname,
      username,
      password:   hashedPassword,
      role:       'student',
      class:      studentClass,
      department,
      schoolId
    });

    await newStudent.save();

    // Flash success with generated username so student knows their login
    req.flash('success_msg', `Registration successful! Your username is: ${username} and your default password is your surname.`);
    res.redirect('/auth/login');

  } catch (error) {
    console.error('Registration error:', error.message);
    req.flash('error_msg', 'Registration failed. Please try again.');
    res.redirect('/auth/register');
  }
};

// --- Logout ---
const logout = (req, res) => {
  // Destroy the session
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

module.exports = { getLogin, postLogin, getRegister, postRegister, logout };