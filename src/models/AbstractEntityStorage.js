export default class AbstractEntityStorage {
  constructor () {
    if (this.constructor === AbstractEntityStorage) {
      throw new TypeError('Abstract class "AbstractEntityStorage" cannot be instantiated directly')
    }
    this.key = null
  }

  findAll () {
    return JSON.parse(window.localStorage.getItem(this.key))
  }

  get (idToFind) {
    if (idToFind === null) {
      return {}
    }
    const index = this.findAll().findIndex(element => element.id === parseInt(idToFind))
    if (index === -1) {
      return {}
    }
    return JSON.parse(window.localStorage.getItem(this.key))[index]
  }

  add (element) {
    const elementsStored = this.findAll() || []
    elementsStored.push(element)
    window.localStorage.setItem(this.key, JSON.stringify(elementsStored))
  }

  remove (indexToRemove) {
    const elementsStored = this.findAll()
    const index = elementsStored.findIndex((element) => parseInt(element.id) === parseInt(indexToRemove))
    if (index === -1) {
      return null
    }
    elementsStored.splice(index, 1)
    window.localStorage.setItem(this.key, JSON.stringify(elementsStored))
  }
}
