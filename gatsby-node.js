const path = require('path')
const pages = require('./src/pages')

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  const projectLayout = path.resolve(`src/components/projectLayout.js`)

  pages.forEach(({ page }) => {
    const path = `/projects/${page.id}`
    createPage({
      path,
      component: projectLayout,
      // Send additional data to page from JSON (or query inside template)
      context: {},
    })
  })
}
