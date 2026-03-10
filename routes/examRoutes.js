const express = require('express');
const router  = express.Router();
const { isLoggedIn } = require('../middleware/authMiddleware');

// Apply auth check to all exam routes
router.use(isLoggedIn);

// Exam routes are handled inside studentRoutes
// This file is reserved for any shared exam API routes
module.exports = router;