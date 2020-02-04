import AbstractEntityStorage from './AbstractEntityStorage.js'

export default class Category extends AbstractEntityStorage {
  constructor () {
    super()
    this.key = 'categories'
  }
}
