const express   = require('express');
const router    = express.Router();
const studentController = require('../controllers/studentController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { isStudent }  = require('../middleware/roleMiddleware');

// Apply auth and role check to all student routes
router.use(isLoggedIn, isStudent);

// --- Dashboard ---
router.get('/dashboard', studentController.getDashboard);

// --- Exams ---
router.get('/exams',                                      studentController.getAvailableExams);
router.get('/exams/instruction/:examId/:subjectId',       studentController.getInstruction);
router.get('/exams/start/:examId/:subjectId',             studentController.startExam);
router.post('/exams/submit',                              studentController.submitExam);
// --- Results ---
router.get('/results',      studentController.getResults);
router.get('/results/:id',  studentController.viewResult);

// --- Progress ---
router.get('/progress', studentController.getProgress);
// --- Profile ---
router.get('/profile',  studentController.getProfile);
router.post('/profile', studentController.postProfile);

module.exports = router;