const bcrypt   = require('bcrypt');
const User     = require('../models/User');
const School   = require('../models/School');
const Subject  = require('../models/Subject');
const Syllabus = require('../models/Syllabus');
const Exam     = require('../models/Exam');
const StudentExam = require('../models/StudentExam');

// --- Admin Dashboard ---
const getDashboard = async (req, res) => {
  try {
    // Count all entities for dashboard overview
    const teacherCount  = await User.countDocuments({ role: 'teacher' });
    const studentCount  = await User.countDocuments({ role: 'student' });
    const subjectCount  = await Subject.countDocuments();
    const examCount     = await Exam.countDocuments();
    const schoolCount   = await School.countDocuments();
    const questionCount = await require('../models/Question').countDocuments();

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      teacherCount,
      studentCount,
      subjectCount,
      examCount,
      schoolCount,
      questionCount
    });
  } catch (error) {
    console.error('Admin dashboard error:', error.message);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/auth/login');
  }
};

// --- Get All Schools ---
const getSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 });
    res.render('admin/schools/index', { title: 'Schools', schools });
  } catch (error) {
    console.error('Get schools error:', error.message);
    req.flash('error_msg', 'Could not load schools.');
    res.redirect('/admin/dashboard');
  }
};

// --- Render Add School Form ---
const getAddSchool = (req, res) => {
  res.render('admin/schools/add', { title: 'Add School' });
};

// --- Handle Add School Form Submission ---
const postAddSchool = async (req, res) => {
  try {
    const { name, location } = req.body;

    // Check if school already exists
    const existing = await School.findOne({ name });
    if (existing) {
      req.flash('error_msg', 'School already exists.');
      return res.redirect('/admin/schools/add');
    }

    await School.create({ name, location });
    req.flash('success_msg', 'School added successfully.');
    res.redirect('/admin/schools');
  } catch (error) {
    console.error('Add school error:', error.message);
    req.flash('error_msg', 'Could not add school.');
    res.redirect('/admin/schools/add');
  }
};

// --- Get All Teachers ---
const getTeachers = async (req, res) => {
  try {
    // Populate assignedSubjects so we can show subject names
    const teachers = await User.find({ role: 'teacher' })
      .populate('assignedSubjects')
      .sort({ createdAt: -1 });

    res.render('admin/teachers/index', { title: 'Teachers', teachers });
  } catch (error) {
    console.error('Get teachers error:', error.message);
    req.flash('error_msg', 'Could not load teachers.');
    res.redirect('/admin/dashboard');
  }
};

// --- Render Add Teacher Form ---
const getAddTeacher = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.render('admin/teachers/add', { title: 'Add Teacher', subjects });
  } catch (error) {
    console.error('Get add teacher form error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/admin/teachers');
  }
};

// --- Handle Add Teacher Form Submission ---
const postAddTeacher = async (req, res) => {
  try {
    const { surname, firstname, username, password, assignedSubjects } = req.body;

    // Check if username already exists
    const existing = await User.findOne({ username });
    if (existing) {
      req.flash('error_msg', 'Username already taken.');
      return res.redirect('/admin/teachers/add');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // assignedSubjects can be a single value or array, normalize to array
    const subjects = Array.isArray(assignedSubjects)
      ? assignedSubjects
      : assignedSubjects ? [assignedSubjects] : [];

    await User.create({
      surname,
      firstname,
      username,
      password: hashedPassword,
      role:     'teacher',
      assignedSubjects: subjects
    });

    req.flash('success_msg', 'Teacher added successfully.');
    res.redirect('/admin/teachers');
  } catch (error) {
    console.error('Add teacher error:', error.message);
    req.flash('error_msg', 'Could not add teacher.');
    res.redirect('/admin/teachers/add');
  }
};

// --- Render Assign Teacher Form ---
const getAssignTeacher = async (req, res) => {
  try {
    const teacher  = await User.findById(req.params.id).populate('assignedSubjects');
    const subjects = await Subject.find().sort({ name: 1 });

    res.render('admin/teachers/assign', { title: 'Assign Subject', teacher, subjects });
  } catch (error) {
    console.error('Get assign teacher form error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/admin/teachers');
  }
};

// --- Handle Assign Teacher Form Submission ---
const postAssignTeacher = async (req, res) => {
  try {
    const { assignedSubjects } = req.body;

    // Normalize to array
    const subjects = Array.isArray(assignedSubjects)
      ? assignedSubjects
      : assignedSubjects ? [assignedSubjects] : [];

    // Update teacher's assigned subjects
    await User.findByIdAndUpdate(req.params.id, { assignedSubjects: subjects });

    req.flash('success_msg', 'Teacher subjects updated successfully.');
    res.redirect('/admin/teachers');
  } catch (error) {
    console.error('Assign teacher error:', error.message);
    req.flash('error_msg', 'Could not assign subjects.');
    res.redirect('/admin/teachers');
  }
};
// --- Get All Subjects ---
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.render('admin/subjects/index', { title: 'Subjects', subjects });
  } catch (error) {
    console.error('Get subjects error:', error.message);
    req.flash('error_msg', 'Could not load subjects.');
    res.redirect('/admin/dashboard');
  }
};

// --- Render Add Subject Form ---
const getAddSubject = (req, res) => {
  res.render('admin/subjects/add', { title: 'Add Subject' });
};

// --- Handle Add Subject Form Submission ---
const postAddSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if subject already exists
    const existing = await Subject.findOne({ name });
    if (existing) {
      req.flash('error_msg', 'Subject already exists.');
      return res.redirect('/admin/subjects/add');
    }

    await Subject.create({ name, description });
    req.flash('success_msg', 'Subject added successfully.');
    res.redirect('/admin/subjects');
  } catch (error) {
    console.error('Add subject error:', error.message);
    req.flash('error_msg', 'Could not add subject.');
    res.redirect('/admin/subjects/add');
  }
};

// --- Render Edit Subject Form ---
const getEditSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.render('admin/subjects/edit', { title: 'Edit Subject', subject });
  } catch (error) {
    console.error('Get edit subject error:', error.message);
    req.flash('error_msg', 'Could not load subject.');
    res.redirect('/admin/subjects');
  }
};

// --- Handle Edit Subject Form Submission ---
const postEditSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Subject.findByIdAndUpdate(req.params.id, { name, description });
    req.flash('success_msg', 'Subject updated successfully.');
    res.redirect('/admin/subjects');
  } catch (error) {
    console.error('Edit subject error:', error.message);
    req.flash('error_msg', 'Could not update subject.');
    res.redirect('/admin/subjects');
  }
};

// --- Get Syllabus by Subject ---
const getSyllabus = async (req, res) => {
  try {
    // Load all subjects for the filter dropdown
    const subjects = await Subject.find().sort({ name: 1 });

    // If a subjectId is passed in query, filter by it
    const filter = req.query.subjectId ? { subjectId: req.query.subjectId } : {};
    const syllabus = await Syllabus.find(filter).populate('subjectId').sort({ createdAt: -1 });

    res.render('admin/syllabus/index', {
      title:           'Syllabus',
      syllabus,
      subjects,
      selectedSubject: req.query.subjectId || ''
    });
  } catch (error) {
    console.error('Get syllabus error:', error.message);
    req.flash('error_msg', 'Could not load syllabus.');
    res.redirect('/admin/dashboard');
  }
};

// --- Render Add Syllabus Form ---
const getAddSyllabus = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.render('admin/syllabus/add', { title: 'Add Syllabus Topic', subjects });
  } catch (error) {
    console.error('Get add syllabus error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/admin/syllabus');
  }
};

// --- Handle Add Syllabus Form Submission ---
const postAddSyllabus = async (req, res) => {
  try {
    const { subjectId, topic, description } = req.body;

    // Check if topic already exists under this subject
    const existing = await Syllabus.findOne({ subjectId, topic });
    if (existing) {
      req.flash('error_msg', 'This topic already exists for this subject.');
      return res.redirect('/admin/syllabus/add');
    }

    await Syllabus.create({ subjectId, topic, description });
    req.flash('success_msg', 'Syllabus topic added successfully.');
    res.redirect('/admin/syllabus');
  } catch (error) {
    console.error('Add syllabus error:', error.message);
    req.flash('error_msg', 'Could not add syllabus topic.');
    res.redirect('/admin/syllabus/add');
  }
};

// --- Render Edit Syllabus Form ---
const getEditSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.findById(req.params.id);
    const subjects = await Subject.find().sort({ name: 1 });
    res.render('admin/syllabus/edit', { title: 'Edit Syllabus Topic', syllabus, subjects });
  } catch (error) {
    console.error('Get edit syllabus error:', error.message);
    req.flash('error_msg', 'Could not load syllabus topic.');
    res.redirect('/admin/syllabus');
  }
};

// --- Handle Edit Syllabus Form Submission ---
const postEditSyllabus = async (req, res) => {
  try {
    const { subjectId, topic, description } = req.body;
    await Syllabus.findByIdAndUpdate(req.params.id, { subjectId, topic, description });
    req.flash('success_msg', 'Syllabus topic updated successfully.');
    res.redirect('/admin/syllabus');
  } catch (error) {
    console.error('Edit syllabus error:', error.message);
    req.flash('error_msg', 'Could not update syllabus topic.');
    res.redirect('/admin/syllabus');
  }
};
// --- Get All Exams ---
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate('subjectId')
      .populate('adminId')
      .sort({ createdAt: -1 });
    res.render('admin/exams/index', { title: 'Exams', exams });
  } catch (error) {
    console.error('Get exams error:', error.message);
    req.flash('error_msg', 'Could not load exams.');
    res.redirect('/admin/dashboard');
  }
};

// --- Render Create Exam Form ---
const getCreateExam = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.render('admin/exams/create', { title: 'Create Exam', subjects });
  } catch (error) {
    console.error('Get create exam error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/admin/exams');
  }
};

// --- Handle Create Exam Form Submission ---
const postCreateExam = async (req, res) => {
  try {
    const { subjectId, questionCount, timer, randomize, retakePolicy } = req.body;
    const Question = require('../models/Question');

    // Pull questions from the subject pool
    let questions = await Question.find({ subjectId });

    // Check if enough questions exist
    if (questions.length < questionCount) {
      req.flash('error_msg', `Not enough questions. Only ${questions.length} available for this subject.`);
      return res.redirect('/admin/exams/create');
    }

    // Shuffle questions if randomize is on
    if (randomize === 'on') {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    // Pick only the required number of questions
    const selectedQuestions = questions.slice(0, questionCount).map(q => q._id);

    await Exam.create({
      adminId:       req.session.user.id,
      subjectId,
      questions:     selectedQuestions,
      questionCount,
      timer,
      randomize:     randomize === 'on',
      retakePolicy
    });

    req.flash('success_msg', 'Exam created successfully.');
    res.redirect('/admin/exams');
  } catch (error) {
    console.error('Create exam error:', error.message);
    req.flash('error_msg', 'Could not create exam.');
    res.redirect('/admin/exams/create');
  }
};

// --- Render Exam Settings Form ---
const getExamSettings = async (req, res) => {
  try {
    const exam     = await Exam.findById(req.params.id).populate('subjectId');
    res.render('admin/exams/settings', { title: 'Exam Settings', exam });
  } catch (error) {
    console.error('Get exam settings error:', error.message);
    req.flash('error_msg', 'Could not load exam settings.');
    res.redirect('/admin/exams');
  }
};

// --- Handle Exam Settings Form Submission ---
const postExamSettings = async (req, res) => {
  try {
    const { timer, randomize, retakePolicy } = req.body;

    await Exam.findByIdAndUpdate(req.params.id, {
      timer,
      randomize:    randomize === 'on',
      retakePolicy
    });

    req.flash('success_msg', 'Exam settings updated successfully.');
    res.redirect('/admin/exams');
  } catch (error) {
    console.error('Update exam settings error:', error.message);
    req.flash('error_msg', 'Could not update exam settings.');
    res.redirect('/admin/exams');
  }
};

// --- Get All Students ---
const getStudents = async (req, res) => {
  try {
    const schools  = await School.find().sort({ name: 1 });
    const filter   = req.query.schoolId ? { role: 'student', schoolId: req.query.schoolId } : { role: 'student' };
    const students = await User.find(filter)
      .populate('schoolId')
      .sort({ createdAt: -1 });

    res.render('admin/students/index', {
      title:          'Students',
      students,
      schools,
      selectedSchool: req.query.schoolId || ''
    });
  } catch (error) {
    console.error('Get students error:', error.message);
    req.flash('error_msg', 'Could not load students.');
    res.redirect('/admin/dashboard');
  }
};

// --- View Individual Student Progress ---
const viewStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('schoolId');

    // Get all exams this student has taken
    const studentExams = await StudentExam.find({ studentId: req.params.id })
      .populate({ path: 'examId', populate: { path: 'subjectId' } })
      .sort({ createdAt: -1 });

    res.render('admin/students/view', { title: 'Student Progress', student, studentExams });
  } catch (error) {
    console.error('View student error:', error.message);
    req.flash('error_msg', 'Could not load student.');
    res.redirect('/admin/students');
  }
};

// --- Filter Students by School ---
const filterStudents = async (req, res) => {
  try {
    const schools = await School.find().sort({ name: 1 });
    res.render('admin/students/filter', { title: 'Filter Students', schools });
  } catch (error) {
    console.error('Filter students error:', error.message);
    req.flash('error_msg', 'Could not load filter page.');
    res.redirect('/admin/students');
  }
};

module.exports = {
  getDashboard,
  getSchools,
  getAddSchool,
  postAddSchool,
  getTeachers,
  getAddTeacher,
  postAddTeacher,
  getAssignTeacher,
  postAssignTeacher,
  getSubjects,
  getAddSubject,
  postAddSubject,
  getEditSubject,
  postEditSubject,
  getSyllabus,
  getAddSyllabus,
  postAddSyllabus,
  getEditSyllabus,
  postEditSyllabus,
  getExams,
  getCreateExam,
  postCreateExam,
  getExamSettings,
  postExamSettings,
  getStudents,
  viewStudent,
  filterStudents
};