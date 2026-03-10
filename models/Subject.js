const mongoose = require('mongoose');

// Subject model - created and managed by admin
const SubjectSchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);