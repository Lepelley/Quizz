import AbstractEntityStorage from './AbstractEntityStorage.js'

export default class Question extends AbstractEntityStorage {
  constructor () {
    super()
    this.key = 'questions'
  }
}
