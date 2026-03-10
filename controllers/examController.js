const Exam     = require('../models/Exam');
const Question = require('../models/Question');

// --- Get Exam With Questions ---
// Pulls exam and its questions, randomizes if setting is on
const getExamWithQuestions = async (examId) => {
  try {
    // Load exam with subject info
    const exam = await Exam.findById(examId).populate('subjectId');
    if (!exam) return null;

    // Load the questions for this exam
    let questions = await Question.find({ _id: { $in: exam.questions } });

    // Shuffle questions if randomize is on
    if (exam.randomize) {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    return { exam, questions };
  } catch (error) {
    console.error('Get exam with questions error:', error.message);
    return null;
  }
};

// --- Check Retake Policy ---
// Returns true if student is allowed to take the exam
const canStudentTakeExam = async (studentId, examId, retakePolicy) => {
  const StudentExam = require('../models/StudentExam');

  // Count how many times student has taken this exam
  const attemptCount = await StudentExam.countDocuments({
    studentId,
    examId,
    status: 'completed'
  });

  // Check against retake policy
  if (retakePolicy === 'none')      return attemptCount === 0;
  if (retakePolicy === 'once')      return attemptCount < 2;
  if (retakePolicy === 'unlimited') return true;

  return false;
};

module.exports = { getExamWithQuestions, canStudentTakeExam };