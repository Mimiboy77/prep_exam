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
    const studentId   = req.session.user.id;
    const student     = await User.findById(studentId);
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
    const studentId = req.session.user.id;

    const exams = await Exam.find({ isVisible: true })
      .populate('subjects.subjectId')
      .sort({ createdAt: -1 });

    // Pass student exam attempts so index.ejs can show status
    const studentExams = await StudentExam.find({ studentId })
      .populate({ path: 'examId', populate: { path: 'subjects.subjectId' } });

    res.render('student/exam/index', { title: 'Available Exams', exams, studentExams });
  } catch (error) {
    console.error('Get available exams error:', error.message);
    req.flash('error_msg', 'Could not load exams.');
    res.redirect('/student/dashboard');
  }
};

// --- Get Exam Instructions (non-JAMB) ---
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

// --- Start Exam (non-JAMB) ---
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

// --- Submit Exam (non-JAMB) ---
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

    const allQuestionIds = exam.subjects.reduce(function(acc, s) {
      return acc.concat(s.questions);
    }, []);

    const Question = require('../models/Question');
    const questions = await Question.find({ _id: { $in: allQuestionIds } });

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

// =============================================================
// JAMB FUNCTIONS
// =============================================================

// --- JAMB: Get Subject Selection Page ---
const getJambSelectSubjects = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate('subjects.subjectId');
    if (!exam || !exam.isJamb) {
      req.flash('error_msg', 'JAMB exam not found.');
      return res.redirect('/student/exams');
    }

    // Check if student already completed this JAMB exam
    const existing = await StudentExam.findOne({
      studentId,
      examId,
      isJamb:  true,
      status:  'completed'
    });

    if (existing) {
      req.flash('error_msg', 'You have already completed this JAMB exam.');
      return res.redirect('/student/results/' + existing._id);
    }

    // Separate compulsory and elective subjects
    const compulsorySubjects = exam.subjects.filter(function(s) {
      return s.isCompulsory;
    });
    const electiveSubjects = exam.subjects.filter(function(s) {
      return !s.isCompulsory;
    });

    res.render('student/exam/select-subjects', {
      title: 'Select Your JAMB Subjects',
      exam,
      compulsorySubjects,
      electiveSubjects
    });
  } catch (error) {
    console.error('JAMB select subjects error:', error.message);
    req.flash('error_msg', 'Could not load subject selection.');
    res.redirect('/student/exams');
  }
};

// --- JAMB: Post Subject Selection ---
const postJambSelectSubjects = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const { examId } = req.params;
    let { electiveSubjectIds } = req.body;

    const exam = await Exam.findById(examId).populate('subjects.subjectId');
    if (!exam || !exam.isJamb) {
      req.flash('error_msg', 'JAMB exam not found.');
      return res.redirect('/student/exams');
    }

    // Normalize to array
    if (!electiveSubjectIds) electiveSubjectIds = [];
    if (!Array.isArray(electiveSubjectIds)) electiveSubjectIds = [electiveSubjectIds];

    // Must select exactly 3 electives
    if (electiveSubjectIds.length !== 3) {
      req.flash('error_msg', 'Please select exactly 3 elective subjects.');
      return res.redirect('/student/exams/jamb/select-subjects/' + examId);
    }

    // Get compulsory subject IDs
    const compulsoryIds = exam.subjects
      .filter(function(s) { return s.isCompulsory; })
      .map(function(s) { return s.subjectId._id.toString(); });

    // Save selection to session
    req.session.jambSelection = req.session.jambSelection || {};
    req.session.jambSelection[examId] = {
      electiveSubjectIds,
      compulsoryIds
    };

    res.redirect('/student/exams/jamb/instruction/' + examId);
  } catch (error) {
    console.error('JAMB post select subjects error:', error.message);
    req.flash('error_msg', 'Could not save subject selection.');
    res.redirect('/student/exams');
  }
};

// --- JAMB: Instruction Page ---
const getJambInstruction = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate('subjects.subjectId');
    if (!exam || !exam.isJamb) {
      req.flash('error_msg', 'JAMB exam not found.');
      return res.redirect('/student/exams');
    }

    // Get selection from session
    const selection = req.session.jambSelection && req.session.jambSelection[examId];
    if (!selection) {
      req.flash('error_msg', 'Please select your subjects first.');
      return res.redirect('/student/exams/jamb/select-subjects/' + examId);
    }

    const allSelectedIds = selection.compulsoryIds.concat(selection.electiveSubjectIds);

    // Get only selected subjects
    const selectedSubjects = exam.subjects.filter(function(s) {
      return allSelectedIds.indexOf(s.subjectId._id.toString()) !== -1;
    });

    res.render('student/exam/jamb-instruction', {
      title:           'JAMB Exam Instructions',
      exam,
      selectedSubjects
    });
  } catch (error) {
    console.error('JAMB instruction error:', error.message);
    req.flash('error_msg', 'Could not load instructions.');
    res.redirect('/student/exams');
  }
};

// --- JAMB: Start Exam ---
const startJambExam = async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate('subjects.subjectId');
    if (!exam || !exam.isJamb) {
      req.flash('error_msg', 'JAMB exam not found.');
      return res.redirect('/student/exams');
    }

    // Get selection from session
    const selection = req.session.jambSelection && req.session.jambSelection[examId];
    if (!selection) {
      req.flash('error_msg', 'Please select your subjects first.');
      return res.redirect('/student/exams/jamb/select-subjects/' + examId);
    }

    const allSelectedIds = selection.compulsoryIds.concat(selection.electiveSubjectIds);

    // Get only selected subjects with their questions
    const selectedSubjects = exam.subjects.filter(function(s) {
      return allSelectedIds.indexOf(s.subjectId._id.toString()) !== -1;
    });

    const Question = require('../models/Question');

    // Load questions for each selected subject
    const subjectsWithQuestions = [];
    for (var i = 0; i < selectedSubjects.length; i++) {
      var sub       = selectedSubjects[i];
      var questions = await Question.find({ _id: { $in: sub.questions } });
      if (sub.randomize) {
        questions = questions.sort(function() { return Math.random() - 0.5; });
      }
      subjectsWithQuestions.push({
        subjectId:      sub.subjectId,
        questionCount:  sub.questionCount,
        isCompulsory:   sub.isCompulsory,
        questions:      questions
      });
    }

    // Create StudentExam record for JAMB
    const studentExam = await StudentExam.create({
      studentId,
      examId,
      isJamb:           true,
      selectedSubjects: allSelectedIds,
      status:           'in-progress'
    });

    res.render('student/exam/jamb-take', {
      title:            'JAMB Exam',
      exam,
      subjectsWithQuestions,
      studentExamId:    studentExam._id,
      jambTimer:        exam.jambTimer,
      layout:           false
    });
  } catch (error) {
    console.error('Start JAMB exam error:', error.message);
    req.flash('error_msg', 'Could not start JAMB exam.');
    res.redirect('/student/exams');
  }
};

// --- JAMB: Submit Exam ---
const submitJambExam = async (req, res) => {
  try {
    const { studentExamId, jambAnswersJson } = req.body;

    const studentExam = await StudentExam.findById(studentExamId);
    if (!studentExam) {
      req.flash('error_msg', 'Exam session not found.');
      return res.redirect('/student/exams');
    }

    const exam = await Exam.findById(studentExam.examId).populate('subjects.subjectId');
    if (!exam) {
      req.flash('error_msg', 'Could not load exam for scoring.');
      return res.redirect('/student/exams');
    }

    const Question = require('../models/Question');

    // Parse answers — format: { subjectId: { questionId: selectedOption } }
    var jambAnswers = {};
    if (jambAnswersJson && jambAnswersJson !== '{}' && jambAnswersJson !== '') {
      jambAnswers = JSON.parse(jambAnswersJson);
    }

    // Calculate score per subject
    const subjectResults = [];
    var totalScore       = 0;

    for (var i = 0; i < exam.subjects.length; i++) {
      var sub = exam.subjects[i];
      var subId = sub.subjectId._id.toString();

      // Only score selected subjects
      if (studentExam.selectedSubjects.indexOf(subId) === -1 &&
          !studentExam.selectedSubjects.map(function(s) {
            return s.toString();
          }).includes(subId)) {
        continue;
      }

      var subAnswersObj = jambAnswers[subId] || {};
      var questions     = await Question.find({ _id: { $in: sub.questions } });

      // Build answers array for this subject
      var parsedAnswers = [];
      Object.keys(subAnswersObj).forEach(function(questionId) {
        var selectedOption = subAnswersObj[questionId];
        if (selectedOption && selectedOption !== '') {
          parsedAnswers.push({ questionId, selectedOption });
        }
      });

      // Count correct answers
      var correct = 0;
      parsedAnswers.forEach(function(ans) {
        var q = questions.find(function(q) {
          return q._id.toString() === ans.questionId;
        });
        if (q && q.answer === ans.selectedOption) correct++;
      });

      // Scale score to 100
      var totalQuestions = sub.questionCount;
      var scaledScore    = Math.round((correct / totalQuestions) * 100);

      totalScore += scaledScore;

      subjectResults.push({
        subjectId:      sub.subjectId._id,
        answers:        parsedAnswers,
        score:          scaledScore,
        totalQuestions: totalQuestions,
        correct:        correct
      });
    }

    // Save results
    await StudentExam.findByIdAndUpdate(studentExamId, {
      subjectResults,
      totalScore,
      status:    'completed',
      dateTaken: new Date()
    });

    req.flash('success_msg', 'JAMB exam submitted! Your total score is ' + totalScore + ' / 400');
    res.redirect('/student/results/jamb/' + studentExamId);
  } catch (error) {
    console.error('Submit JAMB exam error:', error.message);
    req.flash('error_msg', 'Could not submit JAMB exam.');
    res.redirect('/student/exams');
  }
};

// --- JAMB: View Result ---
const viewJambResult = async (req, res) => {
  try {
    const studentId   = req.session.user.id;
    const studentExam = await StudentExam.findOne({
      _id: req.params.id, studentId
    }).populate({
      path: 'examId',
      populate: { path: 'subjects.subjectId' }
    }).populate('subjectResults.subjectId');

    if (!studentExam || !studentExam.isJamb) {
      req.flash('error_msg', 'Result not found.');
      return res.redirect('/student/results');
    }

    const Question = require('../models/Question');

    // Load questions for each subject result
    const subjectResultsWithQuestions = [];
    for (var i = 0; i < studentExam.subjectResults.length; i++) {
      var sr        = studentExam.subjectResults[i];
      var subConfig = studentExam.examId.subjects.find(function(s) {
        return s.subjectId._id.toString() === sr.subjectId._id.toString();
      });
      var questions = subConfig
        ? await Question.find({ _id: { $in: subConfig.questions } }).populate('syllabusId')
        : [];

      subjectResultsWithQuestions.push({
        subjectId:   sr.subjectId,
        score:       sr.score,
        correct:     sr.correct,
        totalQuestions: sr.totalQuestions,
        answers:     sr.answers,
        questions:   questions
      });
    }

    res.render('student/results/jamb-view', {
      title:          'JAMB Result',
      studentExam,
      subjectResults: subjectResultsWithQuestions
    });
  } catch (error) {
    console.error('View JAMB result error:', error.message);
    req.flash('error_msg', 'Could not load JAMB result.');
    res.redirect('/student/results');
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

// --- View Single Result (non-JAMB) ---
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

    // Redirect JAMB results to the JAMB result page
    if (studentExam.isJamb) {
      return res.redirect('/student/results/jamb/' + req.params.id);
    }

    const examKey         = studentExam.examKey;
    const subjectSettings = studentExam.examId.subjects.find(function(s) {
      return examKey === studentExam.examId._id.toString() + s.subjectId._id.toString();
    });
    const subjectName = subjectSettings ? subjectSettings.subjectId.name : 'Exam';

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
    const studentId = req.session.user.id;
    const { getRecommendations } = require('../utils/helpers');

    const studentExams = await StudentExam.find({ studentId, status: 'completed' })
      .populate({ path: 'examId', populate: { path: 'subjects.subjectId' } })
      .sort({ createdAt: -1 });

    const subjectScores = {};
    studentExams.forEach(function(exam) {
      const examType = exam.examId ? exam.examId.examType : 'Unknown';
      if (!subjectScores[examType]) {
        subjectScores[examType] = { total: 0, count: 0, scores: [] };
      }
      // For JAMB use totalScore, for others use score
      var scoreToUse = exam.isJamb ? exam.totalScore / 4 : exam.score;
      subjectScores[examType].total  += scoreToUse;
      subjectScores[examType].count  += 1;
      subjectScores[examType].scores.push(scoreToUse);
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
  postProfile,
  // JAMB
  getJambSelectSubjects,
  postJambSelectSubjects,
  getJambInstruction,
  startJambExam,
  submitJambExam,
  viewJambResult
};