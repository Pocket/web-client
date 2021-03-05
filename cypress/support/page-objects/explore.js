import paths from '../paths'

/**
 * Page Object for the Explore home page
 */
const PageObject = {
  ssrRender(options) {
    return cy.request(paths.explore, options)
  },

  getSSRArticleCards(html) {
    return Cypress.$(html).find('[data-cy^="article-card-"]')
  },

  visit(options) {
    return cy.visit(paths.explore, options)
  },

  getArticleCards() {
    return cy.get('[data-cy^="article-card-"]')
  },

  getFirstArticleCard() {
    return this.getArticleCards().first()
  },

  getFirstArticleSaveButton() {
    return this.getFirstArticleCard().find('[data-cy^="article-save-btn-"]')
  },

  getFirstArticleSaveLoginPopup() {
    return this.getFirstArticleCard().find(
      '[data-cy^="article-save-login-popup-"]'
    )
  },

  clickFirstArticleSaveButton: async function () {
    return this.getFirstArticleSaveButton().click({ force: true })
  }
}

export default PageObject
