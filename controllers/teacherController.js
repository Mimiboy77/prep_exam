const User             = require('../models/User');
const Subject          = require('../models/Subject');
const Syllabus         = require('../models/Syllabus');
const Question         = require('../models/Question');
const { checkDuplicate } = require('./questionController');
const { upload, cloudinary } = require('../config/cloudinary');

// --- Teacher Dashboard ---
const getDashboard = async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const teacher   = await User.findById(teacherId).populate('assignedSubjects');
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
    const teacher   = await User.findById(teacherId).populate('assignedSubjects');
    const subjects  = teacher.assignedSubjects;
    const syllabus  = subjects.length > 0
      ? await Syllabus.find({ subjectId: subjects[0]._id })
      : [];

    res.render('teacher/questions/add', { title: 'Add Question', subjects, syllabus });
  } catch (error) {
    console.error('Get add question error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/teacher/questions');
  }
};

// --- Handle Add Question Form Submission ---
// upload.single('image') handles optional image upload
const postAddQuestion = [upload.single('image'), async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { subjectId, syllabusId, questionText, options, answerIndex, explanation } = req.body;

    // options is an array of 4 strings
    const optionsArray = Array.isArray(options) ? options : [options];

    // answerIndex is 0,1,2,3 — use it to get the correct answer text
    const answer = optionsArray[parseInt(answerIndex)];

    // Run duplicate check before saving
    const { isDuplicate, message } = await checkDuplicate(questionText, subjectId, syllabusId);
    if (isDuplicate) {
      req.flash('error_msg', message);
      return res.redirect('/teacher/questions/add');
    }

    // Get image URL from Cloudinary if uploaded
    const image = req.file ? req.file.path : null;

    await Question.create({
      subjectId,
      syllabusId,
      teacherId,
      questionText,
      image,
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
}];

// --- Render Edit Question Form ---
const getEditQuestion = async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const question  = await Question.findOne({ _id: req.params.id, teacherId })
      .populate('subjectId')
      .populate('syllabusId');

    if (!question) {
      req.flash('error_msg', 'Question not found or access denied.');
      return res.redirect('/teacher/questions');
    }

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
const postEditQuestion = [upload.single('image'), async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { subjectId, syllabusId, questionText, options, answerIndex, explanation } = req.body;

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
    const answer       = optionsArray[parseInt(answerIndex)];

    // If new image uploaded delete old one from Cloudinary first
    let image = question.image;
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (question.image) {
        const publicId = question.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`exam-prep-questions/${publicId}`);
      }
      image = req.file.path;
    }

    await Question.findByIdAndUpdate(req.params.id, {
      subjectId,
      syllabusId,
      questionText,
      image,
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
}];

module.exports = {
  getDashboard,
  getQuestions,
  getAddQuestion,
  postAddQuestion,
  getEditQuestion,
  postEditQuestion
};