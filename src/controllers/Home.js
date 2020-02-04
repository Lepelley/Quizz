import AbstrastController from './AbstractController.js'

export default class Home extends AbstrastController {
  async show () {
    await super.show('home')
  }
}
