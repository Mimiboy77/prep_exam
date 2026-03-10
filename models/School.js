const mongoose = require('mongoose');

// School model - used to identify and filter students
const SchoolSchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true, trim: true },
  location: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('School', SchoolSchema);