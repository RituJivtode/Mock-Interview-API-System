const { Users, InterviewSessions, Questions, Answers, Evaluation } = require('../models')
const { generateQuestions, evaluateAnswers } = require('../services/openaiService');

exports.startInterview = async (req, res) => {
  const { name, role, experience } = req.body;

  try {
    const user = await Users.create({ name, role, experience });
    const session = await InterviewSessions.create({ userId: user.id });

    const questions = await generateQuestions(role, experience);

    const savedQuestions = await Promise.all(
      questions.map(q =>
        Questions.create({ sessionId: session.id, questionText: q })
      )
    );

    return res.status(201).json({
      session_id: session.id,
      questions: savedQuestions.map(q => ({
        id: q.id,
        question: q.questionText,
      }))
    });
  } catch (err) {
    return res.status(500).json({ error: 'Error starting interview', details: err.message });
  }
};

exports.submitAnswer = async (req, res) => {
  const { session_id, question_id, answer } = req.body;

  try {
    await Answers.create({
      sessionId: session_id,
      questionId: question_id,
      answerText: answer
    });

    return res.status(200).json({ status: 'Answer submitted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error submitting answer', details: err.message });
  }
};

exports.evaluateSession = async (req, res) => {
  const { session_id } = req.params;

  try {
    const session = await InterviewSessions.findByPk(session_id, {
      include: [
        { model: Questions },
        {
          model: Answers,
          include: [{ model: Questions }]
        }
      ]
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });

    const answers = await Answers.findAll({
      where: { sessionId: session_id },
      include: [{ model: Questions }]
    });

    const evaluations = await evaluateAnswers(session, answers);

    const savedEvaluations = await Promise.all(
      evaluations.map(e =>
        Evaluation.create({
          sessionId: session_id,
          questionId: e.questionId,
          score: e.score,
          feedback: e.feedback
        })
      )
    );

    const averageScore =
      savedEvaluations.reduce((sum, e) => sum + e.score, 0) / savedEvaluations.length;

    return res.status(200).json({
      session_id,
      overall_score: Number(averageScore.toFixed(1)),
      evaluations: savedEvaluations.map((e, i) => ({
        question_id: e.questionId,
        question: answers[i].Question.questionText,
        answer: answers[i].answerText,
        score: e.score,
        feedback: e.feedback
      }))
    });
  } catch (err) {
    return res.status(500).json({ error: 'Error evaluating answers', details: err.message });
  }
};