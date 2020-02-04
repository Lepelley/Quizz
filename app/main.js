import app from './app.js'

import QuestionModel from '../src/models/Question.js'

import HomeController from '../src/controllers/Home.js'
import AdminController from '../src/controllers/Admin.js'

import ListQuestionsController from '../src/controllers/Question/List.js'
import AddQuestionController from '../src/controllers/Question/Add.js'
import UpdateQuestionController from '../src/controllers/Question/Update.js'

import ListCategoriesController from '../src/controllers/Category/List.js'
import AddCategoryController from '../src/controllers/Category/Add.js'
import UpdateCategoryController from '../src/controllers/Category/Update.js'

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
    .add('/admin', async () => {
      (new AdminController()).show()
    })
    .add('/questions', async () => {
      (new ListQuestionsController()).show()
    })
    .add('/question/add', async () => {
      (new AddQuestionController()).show()
    })
    .add('/question/update/{id}', async (id) => {
      (new UpdateQuestionController()).show(id)
    })
    .add('/categories', async () => {
      (new ListCategoriesController()).show()
    })
    .add('/category/add', async () => {
      (new AddCategoryController()).show()
    })
    .add('/category/update/{id}', async (id) => {
      (new UpdateCategoryController()).show(id)
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