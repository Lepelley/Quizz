import app from '../../../app/app.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class Add extends AbstrastController {
  async show () {
    await super.show('add-category')
    this.listener('#categories-form')
  }

  listener (formId) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()
      ;(new CategoryModel()).add(this.getValueFromForm(event.target))
      app.mvc.router.navigateTo('/categories')
    })
  }

  getValueFromForm (form) {
    return {
      id: Date.now(),
      category: form.category.value
    }
  }
}
