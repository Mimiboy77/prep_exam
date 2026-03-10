const mongoose = require('mongoose');

// Exam model - created by admin, pulls from question pool
const ExamSchema = new mongoose.Schema({
  adminId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
  subjectId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },

  // Questions auto-pulled from the subject question pool
  questions:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],

  // Exam settings set by admin
  questionCount: { type: Number, required: true },
  timer:         { type: Number, required: true }, // duration in minutes
  randomize:     { type: Boolean, default: true }, // shuffle questions
  retakePolicy:  { type: String, enum: ['once', 'unlimited', 'none'], default: 'once' }

}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);