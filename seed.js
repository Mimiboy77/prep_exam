require('dotenv').config();
const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
const User      = require('./models/User');
const School    = require('./models/School');
const connectDB = require('./config/db');

const seedUsers = async () => {
  await connectDB();

  // --- Create Admin ---
  const adminExists = await User.findOne({ username: 'admin' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('password', 10);
    await User.create({
      surname:  'Admin',
      username: 'admin',
      password: hashedPassword,
      role:     'admin'
    });
    console.log('Admin created! Username: admin | Password: password');
  } else {
    console.log('Admin already exists, skipping.');
  }

  // --- Create Teacher ---
  const teacherExists = await User.findOne({ username: 'teacher1' });
  if (!teacherExists) {
    const hashedPassword = await bcrypt.hash('password', 10);
    await User.create({
      surname:   'Smith',
      firstname: 'John',
      username:  'teacher1',
      password:  hashedPassword,
      role:      'teacher'
    });
    console.log('Teacher created! Username: teacher1 | Password: password');
  } else {
    console.log('Teacher already exists, skipping.');
  }

  // --- Create School first (student needs a schoolId) ---
  let school = await School.findOne({ name: 'Demo School' });
  if (!school) {
    school = await School.create({ name: 'Demo School', location: 'Lagos' });
    console.log('Demo school created.');
  } else {
    console.log('Demo school already exists, skipping.');
  }

  // --- Create Student ---
  const studentExists = await User.findOne({ username: 'student1' });
  if (!studentExists) {
    const hashedPassword = await bcrypt.hash('johnson', 10);
    await User.create({
      surname:    'Johnson',
      firstname:  'Mary',
      username:   'student1',
      password:   hashedPassword,
      role:       'student',
      class:      'SS2',
      department: 'Science',
      schoolId:   school._id
    });
    console.log('Student created! Username: student1 | Password: johnson');
  } else {
    console.log('Student already exists, skipping.');
  }

  process.exit();
};

seedUsers();
