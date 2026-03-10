const Question = require('../models/Question');
const { fuzzyMatch } = require('../utils/helpers');

// --- Check for Duplicate Question ---
// Called before saving a new question
// Returns an object with isDuplicate and message
const checkDuplicate = async (questionText, subjectId, syllabusId, excludeId = null) => {
  try {
    // Build filter to find existing questions in same subject and syllabus
    const filter = { subjectId, syllabusId };

    // If editing, exclude the current question from the check
    if (excludeId) filter._id = { $ne: excludeId };

    // Get all existing questions in this subject and syllabus
    const existingQuestions = await Question.find(filter);

    // Run fuzzy match check
    const isDuplicate = fuzzyMatch(questionText, existingQuestions);

    return {
      isDuplicate,
      message: isDuplicate
        ? 'A similar question already exists in this subject and syllabus.'
        : null
    };
  } catch (error) {
    console.error('Duplicate check error:', error.message);
    return { isDuplicate: false, message: null };
  }
};

module.exports = { checkDuplicate };