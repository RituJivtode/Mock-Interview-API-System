// routes/interview.js
const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController')

router.post('/start', interviewController.startInterview);
router.post('/interview/answer', interviewController.submitAnswer);
router.get('/interview/evaluate/:session_id', interviewController.evaluateSession);

module.exports = router;
