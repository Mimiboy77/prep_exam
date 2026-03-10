const mongoose = require('mongoose');

// Syllabus model - topics that belong to a subject
const SyllabusSchema = new mongoose.Schema({
  subjectId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  topic:       { type: String, required: true, trim: true },
  description: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Syllabus', SyllabusSchema);