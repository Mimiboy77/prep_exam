const mongoose = require('mongoose');

// StudentExam model - records every exam attempt by a student
const StudentExamSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },

  // examKey = examId + subjectId — used to track retake policy per subject (non-JAMB)
  examKey:   { type: String, default: '' },

  // ── NON-JAMB fields ──────────────────────────────────────────
  // Each answer stores the questionId and the option the student picked
  answers: [{
    questionId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOption: { type: String }
  }],

  score:     { type: Number, default: 0 },

  // ── JAMB fields ───────────────────────────────────────────────
  isJamb: { type: Boolean, default: false },

  // The 4 subjects the student selected (English + 3 electives)
  selectedSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],

  // Answers and scores broken down per subject
  subjectResults: [{
    subjectId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    answers: [{
      questionId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedOption: { type: String }
    }],
    score:          { type: Number, default: 0 }, // scaled to 100
    totalQuestions: { type: Number, default: 0 }, // 60 for English, 40 for others
    correct:        { type: Number, default: 0 }  // raw correct count
  }],

  // Total JAMB score out of 400
  totalScore: { type: Number, default: 0 },

  // ── Shared fields ─────────────────────────────────────────────
  status:    { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  dateTaken: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('StudentExam', StudentExamSchema);
