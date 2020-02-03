import app from '../../app/app.js'
import QuestionModel from '../models/Question.js'

export default class AddQuestion {
  async show () {
    await app.mvc.loadView('add-question')
    this.newQuestion('questions-form')
  }

  newQuestion (formId) {
    document.getElementById(formId).addEventListener('submit', event => {
      event.preventDefault()

      const newQuestion = {
        id: Date.now(),
        question: event.target.question.value,
        category: event.target.category.value,
        answers: [
          {
            answer: event.target.answer1.value,
            isTrue: event.target.check1.checked
          },
          {
            answer: event.target.answer2.value,
            isTrue: event.target.check2.checked
          },
          {
            answer: event.target.answer3.value,
            isTrue: event.target.check3.checked
          },
          {
            answer: event.target.answer4.value,
            isTrue: event.target.check4.checked
          }
        ]
      }
      
      const questionModel = new QuestionModel()
      questionModel.add(newQuestion)
      event.target.reset()
    })
  }
}
