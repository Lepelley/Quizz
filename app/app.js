const app = {
  // ----------------------------------------------------------------------------------------------------------------
  // MANIPULATION DU DOM DE L'APPLICATION
  // ----------------------------------------------------------------------------------------------------------------
  dom: {
    render: (html) => {
      document.querySelector('main.container').innerHTML = html
    },
    renderElement: (selector, html) => {
      document.querySelector(selector).innerHTML = html
    },
    getElement: (selector) => {
      return document.querySelector(selector)
    },
    getElements: (selector) => {
      return document.querySelectorAll(selector)
    }
  },

  // ----------------------------------------------------------------------------------------------------------------
  // ARCHITECTURE MVC DE L'APPLICATION
  // ----------------------------------------------------------------------------------------------------------------
  mvc: {
    router: null,
    loadView: async (view) => {
      return app.dom.render(await (await window.fetch(`../src/views/${view}.html`)).text())
    }
  }
}

export default app
