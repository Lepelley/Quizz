import app from '../../../app/app.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class Add extends AbstrastController {
  async show () {
    await super.show('add-question')
    this.addCategoriesInput('#category')
    this.listener('#questions-form')
  }

  listener (formId) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()
      ;(new QuestionModel()).add(this.getValueFromForm(event.target))
      app.mvc.router.navigateTo('/questions')
    })
  }

  addCategoriesInput (selector) {
    const categories = (new CategoryModel()).findAll()
    categories.forEach(category => {
      app.dom.getElement(selector).appendChild(this.addOption(category.id, category.category))
    })
  }

  addOption(id, text) {
    const option = document.createElement('option')
    option.setAttribute('value', id)
    option.textContent = text

    return option
  }

  getValueFromForm (form) {
    return {
      id: Date.now(),
      question: form.question.value,
      category: form.category.value,
      answers: [
        {
          answer: form.answer1.value,
          isTrue: form.check1.checked
        },
        {
          answer: form.answer2.value,
          isTrue: form.check2.checked
        },
        {
          answer: form.answer3.value,
          isTrue: form.check3.checked
        },
        {
          answer: form.answer4.value,
          isTrue: form.check4.checked
        }
      ]
    }
  }
}
