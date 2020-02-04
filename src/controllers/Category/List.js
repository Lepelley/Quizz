import app from '../../../app/app.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class ListQuestions extends AbstrastController {
  async show () {
    await super.show('admin-categories')
    this.loadCategories()
    this.tableFilter()
  }

  loadCategories () {
    ;((new CategoryModel()).findAll()).forEach((category) => {
      this.render(category)
    })
  }

  render (element) {
    const trElt = document.createElement('tr')

    this.addCeil(element.category, trElt)

    const ceil = document.createElement('td')
    ceil.appendChild(this.addModifyButton(element.id))
    ceil.appendChild(this.addDeleteButton(element.id, trElt))
    trElt.appendChild(ceil)

    app.dom.getElement('#categories-table').appendChild(trElt)
  }

  addModifyButton (id) {
    const updateButton = document.createElement('a')
    updateButton.setAttribute('href', '/#/category/update/' + id)
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
      if (window.confirm('Voulez-vous supprimer cette catégorie ?')) {
        const categoryModel = new CategoryModel()
        categoryModel.remove(id)
        app.dom.getElement('#categories-table').removeChild(parent)
      }
    })
    return deleteButton
  }

  addCeil (node, parent) {
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
      col_types: ['string'],
      loader: true,
      mark_active_columns: true,
      highlight_keywords: true
    })
    tf.init()
  }
}
