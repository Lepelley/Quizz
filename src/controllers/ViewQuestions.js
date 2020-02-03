import app from '../../app/app.js'
import QuestionModel from '../models/Question.js'

export default class ViewQuestions {
  async show () {
    await app.mvc.loadView('view-questions')
    this.loadQuestions()
    console.log(JSON.parse(window.localStorage.getItem('questions')))
  }

  loadQuestions () {
    const questions = (new QuestionModel()).findAll()
    questions.forEach((question, index) => {
      this.render(question, index)
    })
  }

  render (addQuestion) {
    const trElt = document.createElement('tr')
    trElt.setAttribute('data-index', addQuestion.id)

    this.addCeil(addQuestion.id, trElt)
    this.addCeil(addQuestion.question, trElt)
    this.addCeil(addQuestion.category, trElt)
    
    const goodAnswers = []
    const badAnswers = []
    
    addQuestion.answers.forEach(answer => {
      if (answer.isTrue) {
        goodAnswers.push(answer.answer)
      } else {
        badAnswers.push(answer.answer)
      }
    });
    this.addCeil(goodAnswers.join(', '), trElt)
    this.addCeil(badAnswers.join(', '), trElt)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Supprimer'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.addEventListener('click', event => {
      event.preventDefault()
      if (window.confirm('Voulez-vous supprimer cette question ?')) {
        const questionModel = new QuestionModel()
        questionModel.remove(addQuestion.index)
        document.getElementById('questions-table').removeChild(trElt)
      }
    })
    trElt.appendChild(deleteButton)

    document.getElementById('questions-table').appendChild(trElt)
  }

  addCeil (text, parent) {
    const tdElt = document.createElement('td')
    tdElt.textContent = text
    parent.appendChild(tdElt)
  }
}
