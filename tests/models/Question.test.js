import QuestionModel from '../models/Question.js'

describe('Model Question', () => {
  test('can add a question', () => {
    questionModel = new QuestionModel()
    expect(questionModel.findAll()).toBe([])
  })
})