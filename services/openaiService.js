// services/openaiService.js
const { Configuration, OpenAIApi, OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// const openai = new OpenAIApi(config);

exports.generateQuestions = async (role, experience) => {
    try {
       const prompt = `Generate 5 technical mock interview questions for a ${experience}-year experienced ${role}.`;

        // const completion = await openai.createChatCompletion({
        //     model: 'gpt-4',
        //     messages: [{ role: 'user', content: prompt }],
        // });
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });

        const responseText = completion.data.choices[0].message.content;
        return responseText.split('\n').filter(Boolean).map(q => q.replace(/^\d+\.\s*/, '')); 
    } catch (error) {
        return res.status(500).json({ error: 'Error while generating questions', details: err.message });
    }
};

exports.evaluateAnswers = async (session, answers) => {
  const results = [];
  try {
    for (const ans of answers) {
        const prompt = `You are a technical interviewer. Evaluate the following answer for the question: "${ans.Question.questionText}"\nAnswer: "${ans.answerText}"\nCandidate Role: ${session.role}\nExperience: ${session.experience} years.\nGive a numeric score out of 10 and short constructive feedback.`;

        const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        });

        const resultText = completion.data.choices[0].message.content;
        const scoreMatch = resultText.match(/score\s*[:\-]?\s*(\d+(\.\d+)?)/i);
        const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;

        results.push({
        questionId: ans.questionId,
        score,
        feedback: resultText
        });
    }
        return results;
  } catch (error) {
        return res.status(500).json({ error: 'Error while evaluating answers', details: err.message });
  }

  
};
