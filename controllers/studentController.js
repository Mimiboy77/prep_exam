const Exam        = require('../models/Exam');
const StudentExam = require('../models/StudentExam');
const User        = require('../models/User');
const { calculateScore } = require('../utils/helpers');

// --- Check if student can take exam ---
const canStudentTakeExam = async (studentId, examKey, retakePolicy) => {
  const count = await StudentExam.countDocuments({
    studentId,
    examKey,
    status: 'completed'
  });
  if (retakePolicy === 'none')      return count === 0;
  if (retakePolicy === 'once')      return count < 2;
  if (retakePolicy === 'unlimited') return true;
  return false;
};

// --- Student Dashboard ---
const getDashboard = async (req, res) => {
  try {
    const studentId  = req.session.user.id;
    const student    = await User.findById(studentId);
    const recentExams = await StudentExam.find({ studentId })
      .populate({ path: 'examId', populate: { path: 'subjects.subjectId' } })
      .sort({ createdAt: -1 })
      .limit(5);

    res.render('student/dashboard', { title: 'Student Dashboard', student, recentExams });
  } catch (error) {
    console.error('Student dashboard error:', error.message);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/auth/login');
  }
};

// --- Get Available Exams ---
const getAvailableExams = async (req, res) => {
  try {
    const exams = await Exam.find({ isVisible: true })
      .populate('subjects.subjectId')
      .sort({ createdAt: -1 });

    res.render('student/exam/index', { title: 'Available Exams', exams });
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
    const { examId, subjectId } = req.params;

    const exam = await Exam.findById(examId).populate('subjects.subjectId');
    if (!exam) {
      req.flash('error_msg', 'Exam not found.');
      return res.redirect('/student/exams');
    }

    const subjectSettings = exam.subjects.find(
      s => s.subjectId && s.subjectId._id.toString() === subjectId
    );

    if (!subjectSettings) {
      req.flash('error_msg', 'Subject not found in this exam.');
      return res.redirect('/student/exams');
    }

    const examKey = examId + subjectId;
    const allowed = await canStudentTakeExam(studentId, examKey, subjectSettings.retakePolicy);
    if (!allowed) {
      req.flash('error_msg', 'You have reached the maximum attempts for this exam.');
      return res.redirect('/student/exams');
    }

    res.render('student/exam/instruction', {
      title: 'Exam Instructions',
      exam,
      subjectSettings,
      subjectId
    });
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
    const { examId, subjectId } = req.params;

    const exam = await Exam.findById(examId).populate('subjects.subjectId');
    if (!exam) {
      req.flash('error_msg', 'Exam not found.');
      return res.redirect('/student/exams');
    }

    const subjectSettings = exam.subjects.find(
      s => s.subjectId && s.subjectId._id.toString() === subjectId
    );

    if (!subjectSettings) {
      req.flash('error_msg', 'Subject not found in this exam.');
      return res.redirect('/student/exams');
    }

    const Question = require('../models/Question');
    let questions  = await Question.find({ _id: { $in: subjectSettings.questions } });

    if (subjectSettings.randomize) {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    const examKey     = examId + subjectId;
    const studentExam = await StudentExam.create({
      studentId,
      examId,
      examKey,
      status: 'in-progress'
    });

    res.render('student/exam/take', {
      title:         'Take Exam',
      exam,
      subjectSettings,
      questions,
      studentExamId: studentExam._id,
      layout:        false
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
    const { studentExamId, answersJson } = req.body;

    const studentExam = await StudentExam.findById(studentExamId);
    if (!studentExam) {
      req.flash('error_msg', 'Exam session not found.');
      return res.redirect('/student/exams');
    }

    const exam = await Exam.findById(studentExam.examId);
    if (!exam) {
      req.flash('error_msg', 'Could not load exam for scoring.');
      return res.redirect('/student/exams');
    }

    // Get all question IDs across all subjects in this exam
    const allQuestionIds = exam.subjects.reduce((acc, s) => {
      return acc.concat(s.questions);
    }, []);

    const Question = require('../models/Question');
    const questions = await Question.find({ _id: { $in: allQuestionIds } });

    // Parse answers from JSON
    var parsedAnswers = [];
    if (answersJson && answersJson !== '{}' && answersJson !== '') {
      var answersObj = JSON.parse(answersJson);
      Object.keys(answersObj).forEach(function(questionId) {
        var selectedOption = answersObj[questionId];
        if (selectedOption && selectedOption !== '') {
          parsedAnswers.push({ questionId, selectedOption });
        }
      });
    }

    const score = calculateScore(parsedAnswers, questions);

    await StudentExam.findByIdAndUpdate(studentExamId, {
      answers:   parsedAnswers,
      score,
      status:    'completed',
      dateTaken: new Date()
    });

    req.flash('success_msg', 'Exam submitted! Your score is ' + score + '%');
    res.redirect('/student/results/' + studentExamId);
  } catch (error) {
    console.error('Submit exam error:', error.message);
    req.flash('error_msg', 'Could not submit exam.');
    res.redirect('/student/exams');
  }
};

// --- Get All Results ---
const getResults = async (req, res) => {
  try {
    const studentId    = req.session.user.id;
    const studentExams = await StudentExam.find({ studentId, status: 'completed' })
      .populate({ path: 'examId', populate: { path: 'subjects.subjectId' } })
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
      _id: req.params.id, studentId
    }).populate({ path: 'examId', populate: { path: 'subjects.subjectId' } });

    if (!studentExam) {
      req.flash('error_msg', 'Result not found.');
      return res.redirect('/student/results');
    }

    // Find the specific subject this exam attempt was for using examKey
    const examKey         = studentExam.examKey; // examId + subjectId
    const subjectSettings = studentExam.examId.subjects.find(function(s) {
      return examKey === studentExam.examId._id.toString() + s.subjectId._id.toString();
    });
    const subjectName = subjectSettings ? subjectSettings.subjectId.name : 'Exam';

    // Only load questions for this specific subject (not all subjects)
    const questionIds = subjectSettings ? subjectSettings.questions : [];

    const Question = require('../models/Question');
    const questions = await Question.find({
      _id: { $in: questionIds }
    }).populate('syllabusId');

    res.render('student/results/view', {
      title: 'Exam Result',
      studentExam,
      questions,
      subjectName
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
    const studentId   = req.session.user.id;
    const { getRecommendations } = require('../utils/helpers');

    const studentExams = await StudentExam.find({ studentId, status: 'completed' })
      .populate({ path: 'examId', populate: { path: 'subjects.subjectId' } })
      .sort({ createdAt: -1 });

    // Group scores by exam type
    const subjectScores = {};
    studentExams.forEach(function(exam) {
      const examType = exam.examId ? exam.examId.examType : 'Unknown';
      if (!subjectScores[examType]) {
        subjectScores[examType] = { total: 0, count: 0, scores: [] };
      }
      subjectScores[examType].total  += exam.score;
      subjectScores[examType].count  += 1;
      subjectScores[examType].scores.push(exam.score);
    });

    const progress = Object.keys(subjectScores).map(function(subject) {
      return {
        subject,
        average:  parseFloat((subjectScores[subject].total / subjectScores[subject].count).toFixed(2)),
        attempts: subjectScores[subject].count,
        scores:   subjectScores[subject].scores
      };
    });

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

// --- Get Student Profile ---
const getProfile = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const student   = await User.findById(studentId).populate('schoolId');
    const schools   = await require('../models/School').find().sort({ name: 1 });
    res.render('student/profile', { title: 'My Profile', student, schools });
  } catch (error) {
    console.error('Get profile error:', error.message);
    req.flash('error_msg', 'Could not load profile.');
    res.redirect('/student/dashboard');
  }
};

// --- Update Student Profile ---
const postProfile = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const { surname, firstname, studentClass, department, schoolId } = req.body;

    const student  = await User.findById(studentId);
    let updateData = { surname, firstname, class: studentClass, department, schoolId };

    if (surname.toLowerCase() !== student.surname.toLowerCase()) {
      const bcrypt         = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(surname.toLowerCase(), 10);
      updateData.password  = hashedPassword;
      req.flash('success_msg',
        `Profile updated. Your new password is your new surname: ${surname.toLowerCase()}`
      );
    } else {
      req.flash('success_msg', 'Profile updated successfully.');
    }

    await User.findByIdAndUpdate(studentId, updateData);
    req.session.user.surname = surname;
    res.redirect('/student/profile');
  } catch (error) {
    console.error('Update profile error:', error.message);
    req.flash('error_msg', 'Could not update profile.');
    res.redirect('/student/profile');
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
  getProgress,
  getProfile,
  postProfile
};