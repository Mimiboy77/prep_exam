const express    = require('express');
const router     = express.Router();
const teacherController = require('../controllers/teacherController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { isTeacher }  = require('../middleware/roleMiddleware');

// Apply auth and role check to all teacher routes
router.use(isLoggedIn, isTeacher);

// --- Dashboard ---
router.get('/dashboard', teacherController.getDashboard);

// --- Questions ---
router.get('/questions',              teacherController.getQuestions);
router.get('/questions/add',          teacherController.getAddQuestion);
router.post('/questions/add',         teacherController.postAddQuestion);
router.get('/questions/edit/:id',     teacherController.getEditQuestion);
router.post('/questions/edit/:id',    teacherController.postEditQuestion);

// --- Get Syllabus by Subject (for AJAX dropdown) ---
router.get('/syllabus/:subjectId', async (req, res) => {
  const Syllabus = require('../models/Syllabus');
  const syllabus = await Syllabus.find({ subjectId: req.params.subjectId });
  res.json(syllabus);
});

module.exports = router;