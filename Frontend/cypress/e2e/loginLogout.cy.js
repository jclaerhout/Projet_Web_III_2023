describe('Logout the user', () => {

  it('should go to the connection page and connect to test@test.com with pwd: test', () => {
    cy.visit('/')
    cy.get('a[href="/connection"]').should('exist')
    cy.get('.v-btn:contains("Se deconnecter")').should('not.exist')
    cy.get('.v-btn:contains("Profil")').should('not.exist')
    cy.get('a[href="/connection"]').click()
    cy.url().should('include', '/connection')

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('test');
    cy.get('form').submit();

    cy.url().should('include', '/profil')
  })

  it('should check if user is connected with a token', () => {
    cy.visit('/');
    
    cy.getAllLocalStorage().then((localStorage) => {
      if (localStorage.token) {
        cy.get('a[href="/connection"]').should('not.exist')
        cy.get('.v-btn:contains("Se deconnecter")').should('exist')
        cy.get('.v-btn:contains("Profil")').should('exist')
        // User is connected with a token
        expect(localStorage.token).to.exist;
        cy.get('.v-btn:contains("Se deconnecter")').click();
        cy.url().should('include', '/connection');
      } else {
        // User is not connected
        cy.log('User is not connected');
      }
    })
    
  it('the token should be empty', () => {
    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.be.empty
    })
  })
  });

  it('should log out and navigate to login page', () => {
    
  });
});