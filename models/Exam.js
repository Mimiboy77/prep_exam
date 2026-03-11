const mongoose = require('mongoose');

// Exam model - created by admin, pulls from question pool
const ExamSchema = new mongoose.Schema({
  adminId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User',     required: true },
  subjectId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Subject',  required: true },

  // Optional - if set, questions are pulled from this syllabus topic only
  syllabusId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus', default: null },

  // Questions auto-pulled from the subject/syllabus question pool
  questions:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],

  // Exam settings set by admin
  questionCount: { type: Number, required: true },
  timer:         { type: Number, required: true },
  randomize:     { type: Boolean, default: true },
  retakePolicy:  { type: String, enum: ['once', 'unlimited', 'none'], default: 'once' }

}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);