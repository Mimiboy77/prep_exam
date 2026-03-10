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
router.get('/exams',                        studentController.getAvailableExams);
router.get('/exams/instruction/:examId',    studentController.getInstruction);
router.get('/exams/start/:examId',          studentController.startExam);
router.get('/exams/confirm-submit',         studentController.getConfirmSubmit);
router.post('/exams/submit',                studentController.submitExam);
// --- Results ---
router.get('/results',      studentController.getResults);
router.get('/results/:id',  studentController.viewResult);

// --- Progress ---
router.get('/progress', studentController.getProgress);

module.exports = router;