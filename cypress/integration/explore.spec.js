import explorePage from '../support/page-objects/explore'

describe('Explore', () => {
  describe('SSR Render', () => {
    it('Renders 20 articles on the server', () => {
      explorePage
        .ssrRender()
        .its('body')
        .then((html) => {
          const articlesLength = explorePage.getSSRArticleCards(html).length
          expect(articlesLength).equal(20)
        })
    })
  })
  describe('Login prompt on save', () => {
    beforeEach(() => {
      explorePage.visit()
    })

    it('Prompts me to sign up or login if I try to save an article while logged out', () => {
      explorePage.clickFirstArticleSaveButton()
      explorePage.getFirstArticleSaveLoginPopup().should('be.visible')
    })
  })
  describe('Explore - Save if logged in', () => {
    beforeEach(() => {
      explorePage.visit()
    })

    it.skip('Allows me to save an article if logged in', () => {
      explorePage.clickFirstArticleSaveButton()
    })
  })
})
