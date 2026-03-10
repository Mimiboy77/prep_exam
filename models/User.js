const mongoose = require('mongoose');

// Single User model handles all 3 roles: admin, teacher, student
const UserSchema = new mongoose.Schema({

  // --- Shared fields for all roles ---
  surname:  { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'teacher', 'student'], required: true },

  // --- Teacher specific fields ---
  // Subjects assigned to this teacher by admin
  assignedSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],

  // --- Student specific fields ---
  firstname:  { type: String, trim: true },
  class:      { type: String, trim: true },
  department: { type: String, enum: ['Science', 'Art', 'Commercial'] },
  schoolId:   { type: mongoose.Schema.Types.ObjectId, ref: 'School' },

  // Subjects the student is registered for
  registeredSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);