const app = {
  // ----------------------------------------------------------------------------------------------------------------
  // MANIPULATION DU DOM DE L'APPLICATION
  // ----------------------------------------------------------------------------------------------------------------
  dom: {
    render: (html) => {
      document.querySelector('main.container').innerHTML = html
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
