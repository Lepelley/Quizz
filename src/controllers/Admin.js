import AbstrastController from './AbstractController.js'

export default class Admin extends AbstrastController {
  async show () {
    await super.show('admin')
  }
}
