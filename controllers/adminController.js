const bcrypt      = require('bcryptjs');
const User        = require('../models/User');
const School      = require('../models/School');
const Subject     = require('../models/Subject');
const Syllabus    = require('../models/Syllabus');
const Exam        = require('../models/Exam');
const StudentExam = require('../models/StudentExam');

// --- Admin Dashboard ---
const getDashboard = async (req, res) => {
  try {
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
    const existing = await User.findOne({ username });
    if (existing) {
      req.flash('error_msg', 'Username already taken.');
      return res.redirect('/admin/teachers/add');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const subjects = Array.isArray(assignedSubjects)
      ? assignedSubjects
      : assignedSubjects ? [assignedSubjects] : [];
    await User.create({
      surname, firstname, username,
      password: hashedPassword,
      role: 'teacher',
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
    const subjects = Array.isArray(assignedSubjects)
      ? assignedSubjects
      : assignedSubjects ? [assignedSubjects] : [];
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

// --- Get Syllabus ---
const getSyllabus = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    const filter   = req.query.subjectId ? { subjectId: req.query.subjectId } : {};
    const syllabus = await Syllabus.find(filter).populate('subjectId').sort({ createdAt: -1 });
    res.render('admin/syllabus/index', {
      title: 'Syllabus', syllabus, subjects,
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
      .populate('subjects.subjectId')
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
    const syllabus = await Syllabus.find().populate('subjectId').sort({ topic: 1 });
    res.render('admin/exams/create', { title: 'Create Exam', subjects, syllabus });
  } catch (error) {
    console.error('Get create exam error:', error.message);
    req.flash('error_msg', 'Could not load form.');
    res.redirect('/admin/exams');
  }
};

// --- Handle Create Exam Form Submission ---
const postCreateExam = async (req, res) => {
  try {
    const Question = require('../models/Question');
    const {
      examType, customExamName,
      subjectIds, syllabusIds,
      questionCounts, timers,
      randomizes, retakePolicies,
      isLocked, isVisible
    } = req.body;

    // Use custom name if examType is 'custom'
    const finalExamType = examType === 'custom' ? customExamName : examType;

    if (!finalExamType || finalExamType.trim() === '') {
      req.flash('error_msg', 'Please provide an exam type or custom name.');
      return res.redirect('/admin/exams/create');
    }

    // Normalize all subject fields to arrays
    const subjectIdsArr     = Array.isArray(subjectIds)     ? subjectIds     : [subjectIds];
    const syllabusIdsArr    = Array.isArray(syllabusIds)    ? syllabusIds    : [syllabusIds];
    const questionCountsArr = Array.isArray(questionCounts) ? questionCounts : [questionCounts];
    const timersArr         = Array.isArray(timers)         ? timers         : [timers];
    const randomizesArr     = Array.isArray(randomizes)     ? randomizes     : [randomizes];
    const retakePoliciesArr = Array.isArray(retakePolicies) ? retakePolicies : [retakePolicies];
    const isLockedArr       = Array.isArray(isLocked)       ? isLocked       : [isLocked];

    // Build subjects array
    const subjectsData = [];
    for (let i = 0; i < subjectIdsArr.length; i++) {
      const subjectId     = subjectIdsArr[i];
      const syllabusId    = syllabusIdsArr[i] || null;
      const questionCount = parseInt(questionCountsArr[i]);
      const timer         = parseInt(timersArr[i]);
      const randomize     = randomizesArr[i] === 'on';
      const retakePolicy  = retakePoliciesArr[i];
      const locked        = isLockedArr[i] === 'on';

      if (!subjectId) continue;

      // Build question filter
      const filter = syllabusId ? { subjectId, syllabusId } : { subjectId };
      let questions = await Question.find(filter);

      if (questions.length < questionCount) {
        req.flash('error_msg',
          `Not enough questions for a subject. Only ${questions.length} available.`
        );
        return res.redirect('/admin/exams/create');
      }

      // Shuffle and pick questions
      questions = questions.sort(() => Math.random() - 0.5);
      const selectedQuestions = questions.slice(0, questionCount).map(q => q._id);

      subjectsData.push({
        subjectId,
        syllabusId,
        questions:     selectedQuestions,
        questionCount,
        timer,
        randomize,
        retakePolicy,
        isLocked: locked
      });
    }

    if (subjectsData.length === 0) {
      req.flash('error_msg', 'Please add at least one subject.');
      return res.redirect('/admin/exams/create');
    }

    await Exam.create({
      adminId:   req.session.user.id,
      examType:  finalExamType,
      subjects:  subjectsData,
      isVisible: isVisible === 'on'
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
    const exam     = await Exam.findById(req.params.id).populate('subjects.subjectId');
    const subjects = await Subject.find().sort({ name: 1 });
    const syllabus = await Syllabus.find().populate('subjectId').sort({ topic: 1 });
    res.render('admin/exams/settings', { title: 'Exam Settings', exam, subjects, syllabus });
  } catch (error) {
    console.error('Get exam settings error:', error.message);
    req.flash('error_msg', 'Could not load exam settings.');
    res.redirect('/admin/exams');
  }
};

// --- Handle Exam Settings Form Submission ---
const postExamSettings = async (req, res) => {
  try {
    const { isVisible } = req.body;
    await Exam.findByIdAndUpdate(req.params.id, { isVisible: isVisible === 'on' });
    req.flash('success_msg', 'Exam settings updated successfully.');
    res.redirect('/admin/exams');
  } catch (error) {
    console.error('Update exam settings error:', error.message);
    req.flash('error_msg', 'Could not update exam settings.');
    res.redirect('/admin/exams');
  }
};

// --- Toggle Exam Visibility ---
const toggleExamVisibility = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    await Exam.findByIdAndUpdate(req.params.id, { isVisible: !exam.isVisible });
    req.flash('success_msg',
      `Exam is now ${!exam.isVisible ? 'visible' : 'hidden'} to students.`
    );
    res.redirect('/admin/exams');
  } catch (error) {
    console.error('Toggle visibility error:', error.message);
    req.flash('error_msg', 'Could not update visibility.');
    res.redirect('/admin/exams');
  }
};

// --- Delete Exam ---
const deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Exam deleted successfully.');
    res.redirect('/admin/exams');
  } catch (error) {
    console.error('Delete exam error:', error.message);
    req.flash('error_msg', 'Could not delete exam.');
    res.redirect('/admin/exams');
  }
};

// --- Get All Students ---
const getStudents = async (req, res) => {
  try {
    const schools  = await School.find().sort({ name: 1 });
    const filter   = req.query.schoolId
      ? { role: 'student', schoolId: req.query.schoolId }
      : { role: 'student' };
    const students = await User.find(filter).populate('schoolId').sort({ createdAt: -1 });
    res.render('admin/students/index', {
      title: 'Students', students, schools,
      selectedSchool: req.query.schoolId || ''
    });
  } catch (error) {
    console.error('Get students error:', error.message);
    req.flash('error_msg', 'Could not load students.');
    res.redirect('/admin/dashboard');
  }
};

// --- View Individual Student ---
const viewStudent = async (req, res) => {
  try {
    const student      = await User.findById(req.params.id).populate('schoolId');
    const studentExams = await StudentExam.find({ studentId: req.params.id })
      .populate({ path: 'examId', populate: { path: 'subjects.subjectId' } })
      .sort({ createdAt: -1 });
    res.render('admin/students/view', { title: 'Student Progress', student, studentExams });
  } catch (error) {
    console.error('View student error:', error.message);
    req.flash('error_msg', 'Could not load student.');
    res.redirect('/admin/students');
  }
};

// --- Filter Students ---
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

// --- Delete Student Exam Performance ---
const deleteStudentExam = async (req, res) => {
  try {
    await StudentExam.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Student performance deleted successfully.');
    res.redirect('back');
  } catch (error) {
    console.error('Delete student exam error:', error.message);
    req.flash('error_msg', 'Could not delete performance.');
    res.redirect('back');
  }
};

// --- Reset Student Password ---
const resetStudentPassword = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) {
      req.flash('error_msg', 'Student not found.');
      return res.redirect('/admin/students');
    }
    const defaultPassword = student.surname.toLowerCase();
    const hashedPassword  = await bcrypt.hash(defaultPassword, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    req.flash('success_msg',
      `Password reset successfully. New password is: ${defaultPassword}`
    );
    res.redirect(`/admin/students/${req.params.id}`);
  } catch (error) {
    console.error('Reset password error:', error.message);
    req.flash('error_msg', 'Could not reset password.');
    res.redirect('/admin/students');
  }
};

// --- Get Edit Student Form ---
const getEditStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('schoolId');
    const schools = await School.find().sort({ name: 1 });
    res.render('admin/students/edit', { title: 'Edit Student', student, schools });
  } catch (error) {
    console.error('Get edit student error:', error.message);
    req.flash('error_msg', 'Could not load student.');
    res.redirect('/admin/students');
  }
};

// --- Handle Edit Student Form Submission ---
const postEditStudent = async (req, res) => {
  try {
    const { surname, firstname, studentClass, department, schoolId } = req.body;
    const student = await User.findById(req.params.id);
    if (!student) {
      req.flash('error_msg', 'Student not found.');
      return res.redirect('/admin/students');
    }
    let updateData = { surname, firstname, class: studentClass, department, schoolId };
    if (surname.toLowerCase() !== student.surname.toLowerCase()) {
      const hashedPassword = await bcrypt.hash(surname.toLowerCase(), 10);
      updateData.password  = hashedPassword;
      req.flash('success_msg',
        `Student updated. New password reset to new surname: ${surname.toLowerCase()}`
      );
    } else {
      req.flash('success_msg', 'Student profile updated successfully.');
    }
    await User.findByIdAndUpdate(req.params.id, updateData);
    res.redirect(`/admin/students/${req.params.id}`);
  } catch (error) {
    console.error('Edit student error:', error.message);
    req.flash('error_msg', 'Could not update student.');
    res.redirect('/admin/students');
  }
};

// --- Get Report Page ---
const getReport = async (req, res) => {
  try {
    const schools  = await School.find().sort({ name: 1 });
    const subjects = await Subject.find().sort({ name: 1 });
    res.render('admin/report', { title: 'Performance Report', schools, subjects });
  } catch (error) {
    console.error('Get report error:', error.message);
    req.flash('error_msg', 'Could not load report page.');
    res.redirect('/admin/dashboard');
  }
};

// --- Download Excel Report ---
const downloadReport = async (req, res) => {
  try {
    const ExcelJS  = require('exceljs');
    const { schoolId, subjectId, studentClass, dateFrom, dateTo } = req.query;

    const studentFilter = { role: 'student' };
    if (schoolId)     studentFilter.schoolId = schoolId;
    if (studentClass) studentFilter.class    = studentClass;

    const students   = await User.find(studentFilter).populate('schoolId');
    const studentIds = students.map(s => s._id);

    const examFilter = { studentId: { $in: studentIds }, status: 'completed' };
    if (dateFrom || dateTo) {
      examFilter.dateTaken = {};
      if (dateFrom) examFilter.dateTaken.$gte = new Date(dateFrom);
      if (dateTo)   examFilter.dateTaken.$lte = new Date(dateTo);
    }

    let studentExams = await StudentExam.find(examFilter)
      .populate({
        path: 'examId',
        populate: { path: 'subjects.subjectId' }
      })
      .populate('studentId')
      .sort({ dateTaken: -1 });

    // Filter by subject if selected
    if (subjectId) {
      studentExams = studentExams.filter(se => {
        if (!se.examId || !se.examId.subjects) return false;
        return se.examId.subjects.some(
          s => s.subjectId && s.subjectId._id.toString() === subjectId
        );
      });
    }

    const workbook  = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Performance Report');

    worksheet.columns = [
      { header: 'Full Name',   key: 'fullname',   width: 25 },
      { header: 'Class',       key: 'class',      width: 10 },
      { header: 'Department',  key: 'department', width: 15 },
      { header: 'School',      key: 'school',     width: 25 },
      { header: 'Exam Type',   key: 'examType',   width: 15 },
      { header: 'Score (%)',   key: 'score',      width: 12 },
      { header: 'Pass / Fail', key: 'passfail',   width: 12 },
      { header: 'Date Taken',  key: 'dateTaken',  width: 18 }
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell(function(cell) {
      cell.font      = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Arial' };
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border    = {
        top: { style: 'thin' }, left: { style: 'thin' },
        bottom: { style: 'thin' }, right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    studentExams.forEach(function(se, index) {
      const student  = se.studentId;
      const examType = se.examId ? se.examId.examType : 'N/A';
      const score    = se.score;
      const passFail = score >= 40 ? 'PASS' : 'FAIL';
      const school   = student && student.schoolId ? student.schoolId.name : 'N/A';
      const fullname = student ? `${student.surname} ${student.firstname}` : 'N/A';

      const row = worksheet.addRow({
        fullname,
        class:      student ? student.class      : 'N/A',
        department: student ? student.department  : 'N/A',
        school,
        examType,
        score,
        passfail:   passFail,
        dateTaken:  se.dateTaken ? se.dateTaken.toDateString() : 'N/A'
      });

      const bgColor = index % 2 === 0 ? 'FFF8F9FA' : 'FFFFFFFF';
      row.eachCell(function(cell) {
        cell.font      = { name: 'Arial', size: 10 };
        cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
        cell.alignment = { vertical: 'middle' };
        cell.border    = {
          top:    { style: 'thin', color: { argb: 'FFDEE2E6' } },
          left:   { style: 'thin', color: { argb: 'FFDEE2E6' } },
          bottom: { style: 'thin', color: { argb: 'FFDEE2E6' } },
          right:  { style: 'thin', color: { argb: 'FFDEE2E6' } }
        };
      });

      row.getCell('passfail').font = {
        bold: true, name: 'Arial',
        color: { argb: passFail === 'PASS' ? 'FF28A745' : 'FFDC3545' }
      };
      row.getCell('score').font = {
        bold: true, name: 'Arial',
        color: { argb: score >= 40 ? 'FF28A745' : 'FFDC3545' }
      };
    });

    worksheet.addRow({});
    const totalRow = worksheet.addRow({
      fullname: 'AVERAGE SCORE',
      score:    `=AVERAGE(F2:F${studentExams.length + 1})`
    });
    totalRow.getCell('fullname').font = { bold: true, name: 'Arial' };
    totalRow.getCell('score').font    = { bold: true, name: 'Arial' };
    totalRow.getCell('score').numFmt  = '0.00"%"';

    const filename = `performance-report-${Date.now()}.xlsx`;
    res.setHeader('Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Download report error:', error.message);
    req.flash('error_msg', 'Could not generate report.');
    res.redirect('/admin/report');
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
  toggleExamVisibility,
  deleteExam,
  getStudents,
  viewStudent,
  filterStudents,
  deleteStudentExam,
  resetStudentPassword,
  getEditStudent,
  postEditStudent,
  getReport,
  downloadReport
};