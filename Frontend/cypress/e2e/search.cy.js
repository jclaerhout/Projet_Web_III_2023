describe('Handle the searchbar display and the results clicking', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the landing page', () => {
    cy.get('.accueil-landing').should('be.visible')
  })

  it('should display search results when searching', () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      cy.get('.v-text-field input').type(letter)
      cy.get('.show-results', { timeout: 10000 }).should('be.visible')

      cy.get('.name-search-results').then(($results) => {
        if($results.text().includes('Aucun résultat')) {
          cy.get('p').should('be.visible')
        }
        else {
          cy.get('.result-button').should('be.visible')
        }
      })

      cy.get('.email-search-results').then(($results) => {
        if($results.text().includes('Aucun résultat')) {
          cy.get('p').should('be.visible')
        }
        else {
          cy.get('.result-button').should('be.visible')
        }
      })
      cy.get('.v-text-field input').clear();
    }
    
    })
/*
  it('should display email search results when searching', () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      cy.get('.v-text-field input').type(letter)
      cy.get('.show-results').should('be.visible')
      cy.get('.email-search-results').then(($results) => {
        if($results.text().includes('Aucun résultat')) {
          cy.get('p').should('be.visible')
        }
        else {
          cy.get('.result-button').should('be.visible')
        }
      })
      cy.get('.v-text-field input').clear();
    }
    
    })
*/
  it('should navigate to profile page on search result click', () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      cy.get('.v-text-field input').type(letter)
      cy.get('.show-results', { timeout: 10000 }).should('be.visible')

      cy.get('.name-search-results').then(($results) => {
        if($results.text().includes('Aucun résultat')) {
          cy.get('p').should('be.visible')
        }
        else {
          cy.get('.result-button').then(($buttons) => {
            const randomButtonIndex = Cypress._.random(0, $buttons.length - 1);
            cy.wrap($buttons[randomButtonIndex]).click();
            cy.url().should('include', '/utilisateur/');
            cy.visit('/');
        })
      }})
/*
      cy.get('.email-search-results').then(($results) => {
        if($results.text().includes('Aucun résultat')) {
          cy.get('p').should('be.visible')
        }
        else {
          cy.get('.result-button').first().click()
          cy.url().should('include', '/utilisateur/')
          cy.visit('/')
          return;
        }
      })
*/
      cy.get('.v-text-field input').clear();
    }
  })
  
  it('should navigate to profile page on email search result click', () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      cy.get('.v-text-field input').type(letter)
      cy.get('.show-results').should('be.visible')
      cy.get('.email-search-results').then(($results) => {
        if($results.text().includes('Aucun résultat')) {
          cy.get('p').should('be.visible')
        }
        else {
          cy.get('.result-button').then(($buttons) => {
            const randomButtonIndex = Cypress._.random(0, $buttons.length - 1);
            cy.wrap($buttons[randomButtonIndex]).click();
            cy.url().should('include', '/utilisateur/');
            cy.visit('/');
        })}
      })
      cy.get('.v-text-field input').clear();
    }
  })
})