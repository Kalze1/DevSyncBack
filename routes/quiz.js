const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()



const quizSchema = new mongoose.Schema({
    language: String,
    category: String,
    question: String,
    choices: [],
    correctAnswerIndex: Number,
    
    })


    


const Quiz = mongoose.model('Quiz', quizSchema)




router.get('/', async (req, res) => {
    const quizs = await Quiz.find()
    res.send(quizs)
    console.log(quizs.language)

})



router.post('/', async (req, res) => {
    let quiz = new Quiz({
        "language": req.body.language,
        "category": req.body.category,
        "question": req.body.question,
        "choices": req.body.choices,
        "correctAnswerIndex": req.body.correctAnswerIndex

    })

    quiz = await quiz.save()
    res.send(quiz)
})

router.delete('/:questionId', async (req, res) => {
  const questionId = req.params.questionId; 
    console.log("questionId",questionId)
  
    try {
      const deletedQuestion = await Quiz.findByIdAndDelete(questionId);
      console.log(deletedQuestion)
      res.send({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error deleting question' });
    }
  });


module.exports = router;