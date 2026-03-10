const Exam            = require('../models/Exam');
const StudentExam     = require('../models/StudentExam');
const User            = require('../models/User');
const { getExamWithQuestions, canStudentTakeExam } = require('./examController');
const { calculateScore } = require('../utils/helpers');

// --- Student Dashboard ---
const getDashboard = async (req, res) => {
  try {
    const studentId = req.session.user.id;

    // Get student details with registered subjects
    const student = await User.findById(studentId).populate('registeredSubjects');

    // Get recent 5 exams taken by student
    const recentExams = await StudentExam.find({ studentId })
      .populate({ path: 'examId', populate: { path: 'subjectId' } })
      .sort({ createdAt: -1 })
      .limit(5);

    res.render('student/dashboard', {
      title: 'Student Dashboard',
      student,
      recentExams
    });
  } catch (error) {
    console.error('Student dashboard error:', error.message);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/auth/login');
  }
};

// --- Get Available Exams ---
const getAvailableExams = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const student   = await User.findById(studentId);

    // Load all exams
    const exams = await Exam.find()
      .populate('subjectId')
      .sort({ createdAt: -1 });

    res.render('student/exam/index', { title: 'Available Exams', exams, student });
  } catch (error) {
    console.error('Get available exams error:', error.message);
    req.flash('error_msg', 'Could not load exams.');
    res.redirect('/student/dashboard');
  }
};

// --- Get Exam Instructions ---
const getInstruction = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const examId    = req.params.examId;

    // Load exam details
    const exam = await Exam.findById(examId).populate('subjectId');
    if (!exam) {
      req.flash('error_msg', 'Exam not found.');
      return res.redirect('/student/exams');
    }

    // Check if student is allowed to take this exam
    const allowed = await canStudentTakeExam(studentId, examId, exam.retakePolicy);
    if (!allowed) {
      req.flash('error_msg', 'You have reached the maximum attempts for this exam.');
      return res.redirect('/student/exams');
    }

    res.render('student/exam/instruction', { title: 'Exam Instructions', exam });
  } catch (error) {
    console.error('Get instruction error:', error.message);
    req.flash('error_msg', 'Could not load exam instructions.');
    res.redirect('/student/exams');
  }
};

// --- Start Exam ---
const startExam = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const examId    = req.params.examId;

    // Load exam with questions
    const result = await getExamWithQuestions(examId);
    if (!result) {
      req.flash('error_msg', 'Could not load exam.');
      return res.redirect('/student/exams');
    }

    const { exam, questions } = result;

    // Create a new StudentExam record with status in-progress
    const studentExam = await StudentExam.create({
      studentId,
      examId,
      status: 'in-progress'
    });

    res.render('student/exam/take', {
      title: 'Take Exam',
      exam,
      questions,
      studentExamId: studentExam._id
    });
  } catch (error) {
    console.error('Start exam error:', error.message);
    req.flash('error_msg', 'Could not start exam.');
    res.redirect('/student/exams');
  }
};

// --- Confirm Submit Page ---
const getConfirmSubmit = async (req, res) => {
  try {
    res.render('student/exam/submit', { title: 'Confirm Submission' });
  } catch (error) {
    console.error('Confirm submit error:', error.message);
    res.redirect('/student/exams');
  }
};

// --- Submit Exam ---
const submitExam = async (req, res) => {
  try {
    const { studentExamId, answers } = req.body;

    // Load the StudentExam record
    const studentExam = await StudentExam.findById(studentExamId);
    if (!studentExam) {
      req.flash('error_msg', 'Exam session not found.');
      return res.redirect('/student/exams');
    }

    // Load exam with questions to calculate score
    const result = await getExamWithQuestions(studentExam.examId);
    if (!result) {
      req.flash('error_msg', 'Could not load exam for scoring.');
      return res.redirect('/student/exams');
    }

    const { questions } = result;

    // Parse answers from form
    // answers comes as { questionId: selectedOption }
    const parsedAnswers = Object.keys(answers || {}).map(questionId => ({
      questionId,
      selectedOption: answers[questionId]
    }));

    // Calculate score
    const score = calculateScore(parsedAnswers, questions);

    // Update StudentExam with answers, score and completed status
    await StudentExam.findByIdAndUpdate(studentExamId, {
      answers:   parsedAnswers,
      score,
      status:    'completed',
      dateTaken: new Date()
    });

    req.flash('success_msg', `Exam submitted! Your score is ${score}%`);
    res.redirect(`/student/results/${studentExamId}`);
  } catch (error) {
    console.error('Submit exam error:', error.message);
    req.flash('error_msg', 'Could not submit exam.');
    res.redirect('/student/exams');
  }
};
// --- Get All Results ---
const getResults = async (req, res) => {
  try {
    const studentId = req.session.user.id;

    // Get all completed exams for this student
    const studentExams = await StudentExam.find({ studentId, status: 'completed' })
      .populate({ path: 'examId', populate: { path: 'subjectId' } })
      .sort({ createdAt: -1 });

    res.render('student/results/index', { title: 'My Results', studentExams });
  } catch (error) {
    console.error('Get results error:', error.message);
    req.flash('error_msg', 'Could not load results.');
    res.redirect('/student/dashboard');
  }
};

// --- View Single Result ---
const viewResult = async (req, res) => {
  try {
    const studentId   = req.session.user.id;
    const studentExam = await StudentExam.findOne({
      _id:       req.params.id,
      studentId
    }).populate({ path: 'examId', populate: { path: 'subjectId' } });

    if (!studentExam) {
      req.flash('error_msg', 'Result not found.');
      return res.redirect('/student/results');
    }

    // Load full question details for each answer
    const Question = require('../models/Question');
    const questions = await Question.find({
      _id: { $in: studentExam.examId.questions }
    }).populate('syllabusId');

    res.render('student/results/view', {
      title:      'Exam Result',
      studentExam,
      questions
    });
  } catch (error) {
    console.error('View result error:', error.message);
    req.flash('error_msg', 'Could not load result.');
    res.redirect('/student/results');
  }
};

// --- Get Progress ---
const getProgress = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const { getRecommendations } = require('../utils/helpers');

    // Get all completed exams for this student
    const studentExams = await StudentExam.find({ studentId, status: 'completed' })
      .populate({ path: 'examId', populate: { path: 'subjectId' } })
      .sort({ createdAt: -1 });

    // Group scores by subject
    const subjectScores = {};
    studentExams.forEach(exam => {
      const subjectName = exam.examId && exam.examId.subjectId
        ? exam.examId.subjectId.name
        : 'Unknown';

      if (!subjectScores[subjectName]) {
        subjectScores[subjectName] = { total: 0, count: 0, scores: [] };
      }

      subjectScores[subjectName].total  += exam.score;
      subjectScores[subjectName].count  += 1;
      subjectScores[subjectName].scores.push(exam.score);
    });

    // Calculate average score per subject
    const progress = Object.keys(subjectScores).map(subject => ({
      subject,
      average:    parseFloat((subjectScores[subject].total / subjectScores[subject].count).toFixed(2)),
      attempts:   subjectScores[subject].count,
      scores:     subjectScores[subject].scores
    }));

    // Get recommendations for weak topics
    const recommendations = getRecommendations(studentExams);

    res.render('student/results/progress', {
      title: 'My Progress',
      progress,
      recommendations,
      totalExams: studentExams.length
    });
  } catch (error) {
    console.error('Get progress error:', error.message);
    req.flash('error_msg', 'Could not load progress.');
    res.redirect('/student/dashboard');
  }
};
module.exports = {
  getDashboard,
  getAvailableExams,
  getInstruction,
  startExam,
  getConfirmSubmit,
  submitExam,
  getResults,
  viewResult,
  getProgress
};