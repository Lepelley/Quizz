import app from '../../../app/app.js'
import AbstrastController from '../AbstractController.js'

export default class AbstractAdd extends AbstrastController {
  constructor () {
    super()
    if (this.constructor === AbstractAdd) {
      throw new TypeError('Abstract class "AbstractAdd" cannot be instantiated directly')
    }
  }

  listener (formId, model, routerPath) {
    app.dom.getElement(formId).addEventListener('submit', event => {
      event.preventDefault()
      model.add(this.getValueFromForm(event.target))
      app.mvc.router.navigateTo(routerPath)
    })
  }
}
