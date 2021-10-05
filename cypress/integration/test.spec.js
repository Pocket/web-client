describe('Pocket user page navigation check', () => {

    before(() => {
        cy.viewport(1440, 1440);
        cy.visit("https://getpocket.com");
    });

    it('user logins and navigates from mylist to Discover', () => {
        cy.get('a[href*="/login?s=homepage"]').click();
        cy.get("input[name=username]").type('web.qa'); 
        cy.get("input[name=password]").type('123456')
        cy.get(".login-btn-email").click();
        cy.url().should('include', 'my-list');
        cy.get('[data-cy="global-nav-discover-link"]').click();
        cy.url().should('include', 'explore');
    });

});
