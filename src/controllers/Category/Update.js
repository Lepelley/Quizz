import app from '../../../app/app.js'
import QuestionModel from '../../models/Question.js'
import CategoryModel from '../../models/Category.js'
import AbstrastController from '../AbstractController.js'

export default class Update extends AbstrastController {
  async show (id) {
    await super.show('add-category')
    this.loadForm(id)
    this.listener('#categories-form', id)
  }

  listener (formId, id) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()

      const categoryModel = new CategoryModel()

      const newCategory = {
        id: parseInt(id),
        category: event.target.category.value,
      }

      categoryModel.remove(id)
      categoryModel.add(newCategory)
      app.mvc.router.navigateTo('/categories')
    })
  }

  loadForm (id) {
    const category = (new CategoryModel()).get(id)

    app.dom.getElement('#controller-title').textContent = 'Modifier une catégorie'
    app.dom.getElement('#form-submit').textContent = 'Modifier'
    app.dom.getElement('#category').value = category.category
  }
}
