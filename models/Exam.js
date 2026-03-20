const mongoose = require('mongoose');

// Exam model - created by admin with type, subjects and visibility
const ExamSchema = new mongoose.Schema({
  adminId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Exam type — WAEC, NECO, JAMB or custom
  examType:       { type: String, required: true, trim: true },

  // JAMB specific fields
  isJamb:         { type: Boolean, default: false },
  jambTimer:      { type: Number, default: 120 }, // total minutes for entire JAMB exam

  // Each subject under this exam type has its own settings
  subjects: [{
    subjectId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    syllabusId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus', default: null },
    questions:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    questionCount: { type: Number, required: true },
    timer:         { type: Number, required: true },   // kept for non-JAMB exams
    randomize:     { type: Boolean, default: true },
    retakePolicy:  { type: String, enum: ['once', 'unlimited', 'none'], default: 'once' },
    isLocked:      { type: Boolean, default: false },  // admin can lock subject
    isCompulsory:  { type: Boolean, default: false }   // true for English in JAMB
  }],

  // Visibility — hidden exams not shown to students
  isVisible:      { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);