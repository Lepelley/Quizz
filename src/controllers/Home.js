import AbstrastController from './AbstractController.js'
import app from '../../app/app.js'
import QuizModel from '../models/Quiz.js'

export default class Home extends AbstrastController {
  async show () {
    await super.show('home')
    this.loadQuizzes()
  }

  loadQuizzes () {
    const quizzes = (new QuizModel()).findAll()
    if (quizzes.length > 0) {
      app.dom.getElement('main').removeChild(app.dom.getElement('#no-quiz'))
      quizzes.forEach(quiz => {
        this.createQuizLink(quiz, app.dom.getElement('#quizzes'))
      })
    }
  }

  createQuizLink (quiz, parent) {
    const liElt = document.createElement('li')
    const linkElt = document.createElement('a')
    linkElt.href = '/#/quiz/' + quiz.id
    linkElt.textContent = quiz.name
    liElt.appendChild(linkElt)
    parent.appendChild(liElt)
  }
}
