import app from '../../app/app.js'

export default class AbstrastController {
  constructor () {
    if (this.constructor === AbstrastController) {
      throw new TypeError('Abstract class "AbstractController" cannot be instantiated directly')
    }
  }

  async show (view) {
    await app.mvc.loadView(view)
  }
}
