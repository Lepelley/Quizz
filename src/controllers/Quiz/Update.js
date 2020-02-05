import app from '../../../app/app.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import QuizModel from '../../models/Quiz.js'
import AbstrastController from '../AbstractController.js'

export default class UpdateQuiz extends AbstrastController {
  constructor () {
    super()
    this.numberQuestions = 1
  }

  async show (id) {
    await super.show('add-quiz')
    this.loadForm(id)
    this.listener('#quiz-form', id)
    this.listenerAddQuestion()
  }

  listener (formId, id) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()

      const quizModel = new QuizModel()

      const questionsId = []
      for (let index = 1; index <= this.numberQuestions; index++) {
        if (event.target['question' + index].value !== '-1') {
          questionsId.push(event.target['question' + index].value)
        }
      }

      const newQuiz = {
        id: parseInt(id),
        name: event.target.name.value,
        questions: questionsId
      }

      quizModel.remove(id)
      quizModel.add(newQuiz)
      app.mvc.router.navigateTo('/quizzes')
    })
  }

  listenerAddQuestion () {
    app.dom.getElement('#add-question').addEventListener('click', (event) => {
      event.preventDefault()
      this.newQuestionElement(app.dom.getElement('#quiz-questions'))
    })
  }

  loadForm (id) {
    const quiz = (new QuizModel()).get(id)

    app.dom.getElement('#controller-title').textContent = 'Modifier un quiz'
    app.dom.getElement('#form-submit').textContent = 'Modifier'
    app.dom.getElement('#field-name').value = quiz.name

    if (quiz.questions.length > 0) {
      for (let index = 0; index < quiz.questions.length; index++) {
        if (index > 0) {
          this.newQuestionElement(app.dom.getElement('#quiz-questions'))
        } else {
          this.loadSelectQuestions(app.dom.getElement('#question' + this.numberQuestions))
        }
        this.setSelectedQuestion('#question' + (index + 1), quiz.questions[index])
      }
    }
  }

  newQuestionElement (parent) {
    const divElt = document.createElement('div')
    divElt.classList.add('form-group')
    const selectElt = document.createElement('select')
    selectElt.setAttribute('class', 'form-control')
    selectElt.setAttribute('name', 'question' + ++this.numberQuestions)
    selectElt.setAttribute('id', 'question' + this.numberQuestions)

    const emptyOption = document.createElement('option')
    emptyOption.textContent = ''
    emptyOption.value = '-1'

    selectElt.appendChild(emptyOption)

    this.loadSelectQuestions(selectElt)

    divElt.appendChild(selectElt)
    parent.appendChild(divElt)
  }

  setSelectedQuestion (select, value) {
    const index = this.findIndex(app.dom.getElement(select).options, value)
    app.dom.getElement(select).options.selectedIndex = index
  }

  findIndex (array, value) {
    for (let index = 1; index < array.length; index++) {
      if (array[index].value === value) {
        return index
      }
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
}
