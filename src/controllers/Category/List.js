import app from '../../../app/app.js'
import CategoryModel from '../../models/Category.js'
import AbstractListController from '../Entity/List.js'

export default class ListQuestions extends AbstractListController {
  constructor () {
    super()
    this.model = new CategoryModel()
  }

  async show () {
    await super.show('admin-categories')
    this.renderElements(this.model)
    this.tableFilter()
  }

  render (category) {
    const trElt = document.createElement('tr')

    this.addCeil(category.category, trElt)

    const ceil = document.createElement('td')
    ceil.appendChild(this.addModifyButton(category.id, '/#/category/update/'))
    ceil.appendChild(this.addDeleteButton(category.id, trElt, this.model, '#categories-table'))
    trElt.appendChild(ceil)

    app.dom.getElement('#categories-table').appendChild(trElt)
  }

  tableFilter () {
    ;(new TableFilter(app.dom.getElement('table'), {
      base_path: 'node_modules/tablefilter/dist/tablefilter/',
      extensions: [{ name: 'sort' }],
      col_types: ['string'],
      loader: true,
      mark_active_columns: true,
      highlight_keywords: true
    })).init()
  }
}
