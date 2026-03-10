const User         = require('../models/User');
const Subject      = require('../models/Subject');
const Syllabus     = require('../models/Syllabus');
const Question     = require('../models/Question');
const { checkDuplicate } = require('./questionController');

// --- Teacher Dashboard ---
const getDashboard = async (req, res) => {
  try {
    const teacherId = req.session.user.id;

    // Get teacher with assigned subjects
    const teacher = await User.findById(teacherId).populate('assignedSubjects');

    // Count questions this teacher has set
    const questionCount = await Question.countDocuments({ teacherId });

    res.render('teacher/dashboard', {
      title: 'Teacher Dashboard',
      teacher,
      questionCount
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error.message);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/auth/login');
  }
};

// --- Get Teacher's Questions ---
const getQuestions = async (req, res) => {
  try {
    const teacherId = req.session.user.id;

    // Only load questions set by this teacher
    const questions = await Question.find({ teacherId })
      .populate('subjectId')
      .populate('syllabusId')
      .sort({ createdAt: -1 });

    res.render('teacher/questions/index', { title: 'My Questions', questions });
  } catch (error) {
    console.error('Get questions error:', error.message);
    req.flash('error_msg', 'Could not load questions.');
    res.redirect('/teacher/dashboard');
  }
};

// --- Render Add Question Form ---
const getAddQuestion = async (req, res) => {
  try {
    const teacherId = req.session.user.id;

    // Only load subjects assigned to this teacher
    const teacher  = await User.findById(teacherId).populate('assignedSubjects');
    const subjects = teacher.assignedSubjects;

    // Load syllabus for the first subject by default
    const syllabus = subjects.length > 0
      ? await Syllabus.find({ subjectId: subjects[0]._id })
      : [];

    res.render('teacher/questions/add', {
      title: 'Add Question',
      subjects,
      syllabus
    });
  } catch (error) {
    console.error('Get add question error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/teacher/questions');
  }
};

// --- Handle Add Question Form Submission ---
const postAddQuestion = async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { subjectId, syllabusId, questionText, options, answer, explanation } = req.body;

    // Run duplicate check before saving
    const { isDuplicate, message } = await checkDuplicate(questionText, subjectId, syllabusId);

    // If duplicate found, alert teacher and stop
    if (isDuplicate) {
      req.flash('error_msg', message);
      return res.redirect('/teacher/questions/add');
    }

    // options come as array from form (option1, option2, option3, option4)
    const optionsArray = Array.isArray(options) ? options : [options];

    await Question.create({
      subjectId,
      syllabusId,
      teacherId,
      questionText,
      options: optionsArray,
      answer,
      explanation
    });

    req.flash('success_msg', 'Question added successfully.');
    res.redirect('/teacher/questions');
  } catch (error) {
    console.error('Add question error:', error.message);
    req.flash('error_msg', 'Could not add question.');
    res.redirect('/teacher/questions/add');
  }
};

// --- Render Edit Question Form ---
const getEditQuestion = async (req, res) => {
  try {
    const teacherId = req.session.user.id;

    // Make sure teacher can only edit their own question
    const question = await Question.findOne({ _id: req.params.id, teacherId })
      .populate('subjectId')
      .populate('syllabusId');

    if (!question) {
      req.flash('error_msg', 'Question not found or access denied.');
      return res.redirect('/teacher/questions');
    }

    // Load teacher's assigned subjects and syllabus
    const teacher  = await User.findById(teacherId).populate('assignedSubjects');
    const subjects = teacher.assignedSubjects;
    const syllabus = await Syllabus.find({ subjectId: question.subjectId._id });

    res.render('teacher/questions/edit', {
      title: 'Edit Question',
      question,
      subjects,
      syllabus
    });
  } catch (error) {
    console.error('Get edit question error:', error.message);
    req.flash('error_msg', 'Could not load question.');
    res.redirect('/teacher/questions');
  }
};

// --- Handle Edit Question Form Submission ---
const postEditQuestion = async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { subjectId, syllabusId, questionText, options, answer, explanation } = req.body;

    // Make sure teacher owns this question
    const question = await Question.findOne({ _id: req.params.id, teacherId });
    if (!question) {
      req.flash('error_msg', 'Question not found or access denied.');
      return res.redirect('/teacher/questions');
    }

    // Run duplicate check excluding current question
    const { isDuplicate, message } = await checkDuplicate(
      questionText, subjectId, syllabusId, req.params.id
    );

    if (isDuplicate) {
      req.flash('error_msg', message);
      return res.redirect(`/teacher/questions/edit/${req.params.id}`);
    }

    const optionsArray = Array.isArray(options) ? options : [options];

    await Question.findByIdAndUpdate(req.params.id, {
      subjectId,
      syllabusId,
      questionText,
      options: optionsArray,
      answer,
      explanation
    });

    req.flash('success_msg', 'Question updated successfully.');
    res.redirect('/teacher/questions');
  } catch (error) {
    console.error('Edit question error:', error.message);
    req.flash('error_msg', 'Could not update question.');
    res.redirect('/teacher/questions');
  }
};

module.exports = {
  getDashboard,
  getQuestions,
  getAddQuestion,
  postAddQuestion,
  getEditQuestion,
  postEditQuestion
};