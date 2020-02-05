import app from '../../../app/app.js'
import AbstrastController from '../AbstractController.js'

export default class AbstractList extends AbstrastController {
  constructor () {
    super()
    if (this.constructor === AbstractList) {
      throw new TypeError('Abstract class "AbstractList" cannot be instantiated directly')
    }
  }

  renderElements (model) {
    this.model.findAll().forEach((element) => {
      this.render(element)
    })
  }

  // render(entities)
  addModifyButton (id, linkToUpdate) {
    const updateButton = document.createElement('a')
    updateButton.setAttribute('href', linkToUpdate + id)
    updateButton.innerHTML = '<i class="fas fa-pen"></i>'
    updateButton.classList.add('btn', 'btn-info', 'mr-2')
    return updateButton
  }

  addDeleteButton (id, parent, model, table) {
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.addEventListener('click', event => {
      event.preventDefault()
      if (window.confirm('Voulez-vous supprimer cette question ?')) {
        model.remove(id)
        app.dom.getElement(table).removeChild(parent)
      }
    })
    return deleteButton
  }

  addCeil (node, parent) {
    if (typeof node === 'string' || typeof node === 'number') {
      node = document.createTextNode(node)
    }

    const tdElt = document.createElement('td')
    tdElt.appendChild(node)
    parent.appendChild(tdElt)
  }
}
