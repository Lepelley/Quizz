import app from '../../app/app.js'
import QuestionModel from '../models/Question.js'

export default class Home {
  async show () {
    await app.mvc.loadView('home')
  }
}
