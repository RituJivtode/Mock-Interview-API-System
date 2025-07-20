const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateQuestions = async (role, experience) => {
  return [
      `What are some challenges you faced as a ${role}?`,
      `Explain a project where you used your ${experience}+ years of experience.`,
      `How do you stay updated in the ${role} field?`,
      `What are common mistakes in ${role}-related development?`,
      `Describe a complex problem you solved in your role as a ${role}.`
  ];
}
// exports.generateQuestions = async (role, experience) => {
//   try {
//       const prompt = `Generate 5 technical mock interview questions for a ${experience}-year experienced ${role}.`;

//       const completion = await openai.chat.completions.create({
//           model: 'gpt-3.5-turbo',
//           messages: [{ role: 'user', content: prompt }],
//       });

//       const responseText = completion.data.choices[0].message.content;
//       return responseText.split('\n').filter(Boolean).map(q => q.replace(/^\d+\.\s*/, '')); 
//   } catch (error) {
//       console.log(error.message)
//       return error.message
//       // return res.status(500).json({ error: 'Error while generating questions', details: err.message });
//   }
// };

exports.evaluateAnswers = async (session, answers) => {
  const results = [];
  try {
    for (const ans of answers) {
      // Simulate a score and feedback
      const mockScore = Math.floor(Math.random() * 6) + 5; // score between 5–10
      const mockFeedback = `Score: ${mockScore}/10. Good attempt! Improve your explanation and structure.`;

      results.push({
        questionId: ans.questionId,
        score: mockScore,
        feedback: mockFeedback
      });
    }

    return results;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// exports.evaluateAnswers = async (session, answers) => {
//   const results = [];
//   try {
//     for (const ans of answers) {
//         const prompt = `You are a technical interviewer. Evaluate the following answer for the question: "${ans.Question.questionText}"\nAnswer: "${ans.answerText}"\nCandidate Role: ${session.role}\nExperience: ${session.experience} years.\nGive a numeric score out of 10 and short constructive feedback.`;

//         const completion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//         });

//         const resultText = completion.data.choices[0].message.content;
//         const scoreMatch = resultText.match(/score\s*[:\-]?\s*(\d+(\.\d+)?)/i);
//         const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;

//         results.push({
//         questionId: ans.questionId,
//         score,
//         feedback: resultText
//         });
//     }
//     return results;
//   } catch (error) {
//       console.log(error.message)
//       return error.message  
//   }  
// };
