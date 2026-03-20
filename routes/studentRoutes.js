const express           = require('express');
const router            = express.Router();
const studentController = require('../controllers/studentController');
const { isLoggedIn }    = require('../middleware/authMiddleware');
const { isStudent }     = require('../middleware/roleMiddleware');

// Apply auth and role check to all student routes
router.use(isLoggedIn, isStudent);

// --- Dashboard ---
router.get('/dashboard', studentController.getDashboard);

// --- Exams (non-JAMB) ---
router.get('/exams',                                studentController.getAvailableExams);
router.get('/exams/instruction/:examId/:subjectId', studentController.getInstruction);
router.get('/exams/start/:examId/:subjectId',       studentController.startExam);
router.post('/exams/submit',                        studentController.submitExam);

// --- Exams (JAMB) ---
router.get('/exams/jamb/select-subjects/:examId',   studentController.getJambSelectSubjects);
router.post('/exams/jamb/select-subjects/:examId',  studentController.postJambSelectSubjects);
router.get('/exams/jamb/instruction/:examId',       studentController.getJambInstruction);
router.get('/exams/jamb/start/:examId',             studentController.startJambExam);
router.post('/exams/jamb/submit',                   studentController.submitJambExam);

// --- Results ---
router.get('/results',           studentController.getResults);
router.get('/results/jamb/:id',  studentController.viewJambResult);
router.get('/results/:id',       studentController.viewResult);

// --- Progress ---
router.get('/progress', studentController.getProgress);

// --- Profile ---
router.get('/profile',  studentController.getProfile);
router.post('/profile', studentController.postProfile);

module.exports = router;