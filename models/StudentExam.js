const mongoose = require('mongoose');

// StudentExam model - records every exam attempt by a student
const StudentExamSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },

  // Each answer stores the questionId and the option the student picked
  answers: [{
    questionId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOption: { type: String }
  }],

  score:     { type: Number, default: 0 },   // final score after submission
  status:    { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  dateTaken: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('StudentExam', StudentExamSchema);
