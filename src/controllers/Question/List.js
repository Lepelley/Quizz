import app from '../../../app/app.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class List extends AbstrastController {
  async show () {
    await super.show('admin-questions')
    this.loadQuestions()
    this.tableFilter()
  }

  loadQuestions () {
    ;((new QuestionModel()).findAll()).forEach((question) => {
      this.render(question)
    })
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
    ceil.appendChild(this.addModifyButton(addQuestion.id))
    ceil.appendChild(this.addDeleteButton(addQuestion.id, trElt))
    trElt.appendChild(ceil)

    app.dom.getElement('#questions-table').appendChild(trElt)
  }

  addModifyButton (id) {
    const updateButton = document.createElement('a')
    updateButton.setAttribute('href', '/#/question/update/' + id)
    updateButton.textContent = 'Modifier'
    updateButton.classList.add('btn', 'btn-info', 'mr-2')
    return updateButton
  }

  addDeleteButton (id, parent) {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Supprimer'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.addEventListener('click', event => {
      event.preventDefault()
      if (window.confirm('Voulez-vous supprimer cette question ?')) {
        const questionModel = new QuestionModel()
        questionModel.remove(id)
        app.dom.getElement('#questions-table').removeChild(parent)
      }
    })
    return deleteButton
  }

  addCeil (node, parent) {
    if (node === undefined) {
      node = ''
    }
    if (typeof node === 'string' || typeof node === 'number') {
      node = document.createTextNode(node)
    }
    const tdElt = document.createElement('td')
    tdElt.appendChild(node)
    parent.appendChild(tdElt)
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
