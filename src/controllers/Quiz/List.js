import app from '../../../app/app.js'
import QuizModel from '../../models/Quiz.js'
import QuestionModel from '../../models/Question.js'
import AbstrastListController from '../Entity/List.js'

export default class ListQuizzes extends AbstrastListController {
  constructor () {
    super()
    this.model = new QuizModel()
  }

  async show () {
    await super.show('admin-quizzes')
    this.renderElements(this.model)
    this.tableFilter()
  }

  render (element) {
    const trElt = document.createElement('tr')

    this.addCeil(new Date(element.id).toLocaleString(), trElt)
    this.addCeil(element.name, trElt)
    let nbQuestionsQuiz = 0
    element.questions.forEach(question => {
      if ((new QuestionModel()).get(question).id !== undefined) {
        nbQuestionsQuiz++
      }
    })
    this.addCeil(nbQuestionsQuiz, trElt)

    const ceil = document.createElement('td')
    ceil.appendChild(this.addModifyButton(element.id, '/#/quiz/update/'))
    ceil.appendChild(this.addDeleteButton(element.id, trElt, this.model, '#quizzes-table'))
    trElt.appendChild(ceil)

    app.dom.getElement('#quizzes-table').appendChild(trElt)
  }

  tableFilter () {
    const tf = new TableFilter(app.dom.getElement('table'), {
      base_path: 'node_modules/tablefilter/dist/tablefilter/',
      extensions: [{ name: 'sort' }],
      col_types: ['string'],
      loader: true,
      mark_active_columns: true,
      highlight_keywords: true
    })
    tf.init()
  }
}
