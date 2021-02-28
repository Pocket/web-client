import paths from '../paths'

/**
 * Page Object for the Explore home page
 */
const SyndicatedPageObject = {
  ssrRender(options) {
    return cy.request(paths.getArticleUrl('syndication-style-guide'), options)
  },

  getSSRParsedContent(html) {
    return Cypress.$(html).find('[data-cy="parsed-content"]')
  }
}

export default SyndicatedPageObject
