import AbstractEntityStorage from './AbstractEntityStorage.js'

export default class Quiz extends AbstractEntityStorage {
  constructor () {
    super()
    this.key = 'quiz'
  }
}
