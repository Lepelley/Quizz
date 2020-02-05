import app from '../../../app/app.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import AbstrastListController from '../Entity/List.js'

export default class List extends AbstrastListController {
  constructor () {
    super()
    this.model = new QuestionModel()
  }

  async show () {
    await super.show('admin-questions')
    this.renderElements(this.model)
    this.tableFilter()
  }

  render (addQuestion) {
    const trElt = document.createElement('tr')

    this.addCeil(addQuestion.question, trElt)

    let categoryName = ((new CategoryModel()).get(addQuestion.category)).category
    if (categoryName === undefined) {
      categoryName = 'Pas de catégorie'
    }
    this.addCeil(categoryName, trElt)

    const ceil = document.createElement('td')
    ceil.appendChild(this.addModifyButton(addQuestion.id, '/#/question/update/'))
    ceil.appendChild(this.addDeleteButton(addQuestion.id, trElt, this.model, '#questions-table'))
    trElt.appendChild(ceil)

    app.dom.getElement('#questions-table').appendChild(trElt)
  }

  tableFilter () {
    const tf = new TableFilter(app.dom.getElement('table'), {
      base_path: 'node_modules/tablefilter/dist/tablefilter/',
      extensions: [{ name: 'sort' }],
      col_types: ['string', 'string'],
      col_1: 'select',
      loader: true,
      mark_active_columns: true,
      highlight_keywords: true
    })
    tf.init()
  }
}
