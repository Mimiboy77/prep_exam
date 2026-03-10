const express     = require('express');
const router      = express.Router();
const adminController = require('../controllers/adminController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { isAdmin }    = require('../middleware/roleMiddleware');

// Apply auth and role check to all admin routes
router.use(isLoggedIn, isAdmin);

// --- Dashboard ---
router.get('/dashboard', adminController.getDashboard);

// --- Schools ---
router.get('/schools',      adminController.getSchools);
router.get('/schools/add',  adminController.getAddSchool);
router.post('/schools/add', adminController.postAddSchool);

// --- Teachers ---
router.get('/teachers',              adminController.getTeachers);
router.get('/teachers/add',          adminController.getAddTeacher);
router.post('/teachers/add',         adminController.postAddTeacher);
router.get('/teachers/assign/:id',   adminController.getAssignTeacher);
router.post('/teachers/assign/:id',  adminController.postAssignTeacher);
// --- Subjects ---
router.get('/subjects',          adminController.getSubjects);
router.get('/subjects/add',      adminController.getAddSubject);
router.post('/subjects/add',     adminController.postAddSubject);
router.get('/subjects/edit/:id', adminController.getEditSubject);
router.post('/subjects/edit/:id',adminController.postEditSubject);

// --- Syllabus ---
router.get('/syllabus',          adminController.getSyllabus);
router.get('/syllabus/add',      adminController.getAddSyllabus);
router.post('/syllabus/add',     adminController.postAddSyllabus);
router.get('/syllabus/edit/:id', adminController.getEditSyllabus);
router.post('/syllabus/edit/:id',adminController.postEditSyllabus);
// --- Exams ---
router.get('/exams',               adminController.getExams);
router.get('/exams/create',        adminController.getCreateExam);
router.post('/exams/create',       adminController.postCreateExam);
router.get('/exams/settings/:id',  adminController.getExamSettings);
router.post('/exams/settings/:id', adminController.postExamSettings);

// --- Students ---
router.get('/students',          adminController.getStudents);
router.get('/students/filter',   adminController.filterStudents);
router.get('/students/:id',      adminController.viewStudent);
module.exports = router;