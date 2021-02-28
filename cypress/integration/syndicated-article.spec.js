import article from '../support/page-objects/syndicated-article'

describe('Syndicated Article SSR', () => {
  it('Renders article content on the server', () => {
    article
      .ssrRender()
      .its('body')
      .then((html) => {
        const articleContent = article.getSSRParsedContent(html).length
        expect(articleContent).equal(1)
      })
  })
})
