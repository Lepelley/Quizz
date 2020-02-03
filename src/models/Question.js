export default class Question {
  findAll () {
    return JSON.parse(window.localStorage.getItem('questions'))
  }

  add (question) {
    let questions = this.findAll()
    if (questions === null) {
      questions = []
    }
    questions.push(question)
    window.localStorage.setItem('questions', JSON.stringify(questions))
  }

  remove (indexToRemove) {
    const questions = this.findAll()
    const index = questions.findIndex(question => {
      question.id = indexToRemove
    })
    questions.splice(index, 1)
    window.localStorage.setItem('questions', JSON.stringify(questions))
  }
}
