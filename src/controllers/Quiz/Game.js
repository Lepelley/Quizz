import AbstrastController from '../AbstractController.js'

export default class QuizGame extends AbstrastController {
  async show () {
    await super.show('game')
  }
}
