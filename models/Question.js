const mongoose = require('mongoose');

// Question model - set by teachers under a subject and syllabus
const QuestionSchema = new mongoose.Schema({
  subjectId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Subject',  required: true },
  syllabusId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus', required: true },
  teacherId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',     required: true },
  questionText: { type: String, required: true, trim: true },

  // Optional image for questions that need diagrams
  image:        { type: String, default: null },

  // Array of 4 options e.g ['Paris', 'London', 'Rome', 'Berlin']
  options:      [{ type: String, required: true, trim: true }],

  // The correct answer must match one of the options exactly
  answer:       { type: String, required: true, trim: true },

  // Optional explanation shown to student after exam
  explanation:  { type: String, trim: true }

}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);