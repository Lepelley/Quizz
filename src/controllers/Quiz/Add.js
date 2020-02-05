import app from '../../../app/app.js'
import QuizModel from '../../models/Quiz.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class AddQuiz extends AbstrastController {
  constructor () {
    super()
    this.numberQuestions = 1
  }

  async show () {
    await super.show('add-quiz')
    this.listener('#quiz-form')
    this.loadSelectQuestions(app.dom.getElement('#question1'))
    this.listenerAddQuestion()
  }

  listener (formId) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()
      ;(new QuizModel()).add(this.getValueFromForm(event.target))
      app.mvc.router.navigateTo('/quizzes')
    })
  }

  getValueFromForm (form) {
    const questionsId = []
    for (let index = 1; index <= this.numberQuestions; index++) {
      if (form['question' + index].value !== '-1') {
        questionsId.push(form['question' + index].value)
      }
    }

    return {
      id: Date.now(),
      name: form.name.value,
      questions: questionsId
    }
  }

  loadSelectQuestions (select) {
    ;(new QuestionModel()).findAll().forEach(question => {
      const data = document.createElement('option')
      data.setAttribute('value', question.id)
      let categoryName = ((new CategoryModel()).get(question.category)).category
      if (categoryName === undefined) {
        categoryName = 'Pas de catégorie'
      }
      data.textContent = `${question.question} (${categoryName})`
      select.appendChild(data)
    })
  }

  listenerAddQuestion () {
    app.dom.getElement('#add-question').addEventListener('click', (event) => {
      event.preventDefault()
      this.newQuestionElement(app.dom.getElement('#quiz-questions'))
    })
  }

  newQuestionElement (parent) {
    const divElt = document.createElement('div')
    divElt.classList.add('form-group')
    const selectElt = document.createElement('select')
    selectElt.setAttribute('class', 'form-control')
    selectElt.setAttribute('name', 'question' + ++this.numberQuestions)

    const emptyOption = document.createElement('option')
    emptyOption.textContent = ''
    emptyOption.value = '-1'

    selectElt.appendChild(emptyOption)

    this.loadSelectQuestions(selectElt)

    divElt.appendChild(selectElt)
    parent.appendChild(divElt)
  }
}
