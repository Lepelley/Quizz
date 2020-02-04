import app from '../../../app/app.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class Update extends AbstrastController {
  async show (id) {
    await super.show('add-question')
    this.loadQuestionForm(id)
    this.listener('#questions-form', id)
  }

  listener (formId, id) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()

      const newQuestion = {
        id: (new QuestionModel()).get(id).id,
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
      questionModel.remove(id)
      questionModel.add(newQuestion)
      app.mvc.router.navigateTo('/questions')
    })
  }

  loadQuestionForm (id) {
    const question = (new QuestionModel()).get(id)

    app.dom.getElement('#controller-title').textContent = 'Modifier une question'
    app.dom.getElement('#form-submit').textContent = 'Modifier'
    this.addCategoriesInput('#category', question.category)
    app.dom.getElement('#question').value = question.question
    app.dom.getElement('#answer1').value = question.answers[0].answer
    app.dom.getElement('#check1').checked = question.answers[0].isTrue
    app.dom.getElement('#answer2').value = question.answers[1].answer
    app.dom.getElement('#check2').checked = question.answers[1].isTrue
    app.dom.getElement('#answer3').value = question.answers[2].answer
    app.dom.getElement('#check3').checked = question.answers[2].isTrue
    app.dom.getElement('#answer4').value = question.answers[3].answer
    app.dom.getElement('#check4').checked = question.answers[3].isTrue
  }

  addCategoriesInput (selector, idChecked) {
    const categories = (new CategoryModel()).findAll()
    categories.forEach(category => {
      app.dom.getElement(selector).appendChild(this.addOption(category.id, category.category, idChecked))
    })
  }

  addOption(id, text, idChecked) {
    const option = document.createElement('option')
    option.setAttribute('value', id)
    if (id === parseInt(idChecked)) {
      option.setAttribute('selected', 'true')
    }
    option.textContent = text

    return option
  }
}
