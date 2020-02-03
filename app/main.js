import app from './app.js'
// import config from './config.js'

import HomeController from '../src/controllers/Home.js'
import ViewQuestionsController from '../src/controllers/ViewQuestions.js'
import AddQuestionController from '../src/controllers/AddQuestion.js'

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter () {
  app.mvc.router = (new Router({
    mode: 'hash',
    root: '/index.html',
    page404: (path) => console.error('"/' + path + '" Page not found')
  }))
    .add('/', async () => {
      (new HomeController()).show()
    })
    .add('/questions', async () => {
      (new ViewQuestionsController()).show()
    })
    .add('/question/add', async () => {
      (new AddQuestionController()).show()
    })
    .check()
    .addUriListener()
}

// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  initializeRouter()
})