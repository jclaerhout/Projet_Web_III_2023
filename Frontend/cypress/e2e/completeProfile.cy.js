describe('Test de l\'Us-7 -> completion de profil', () => {

  it('Us-7', () => {
    cy.visit('/')
    cy.get('a[href="/connection"]').click()
    cy.url().should('include', '/connection')

    cy.get('input[type="email"]').type('test@gmail.com');
    cy.get('input[type="password"]').type('123');
    cy.get('form').submit();

    cy.url().should('include', '/profil')
    cy.get('.v-btn:contains("Compléter mon profil")').click();
    cy.url().should('include', '/completion-profil')

    cy.get('#firstname').type('John');
    cy.get('#lastname').type('Doe');
    cy.get('#birthdate').type('2000-01-15');
    /*cy.get('#sexe').then(($result) => {
      cy.get('#sexe').select('Homme');
    })*/
    cy.get('#description').type('Je suis un utilisateur passionné.');
    cy.get('#location').type('Paris');
    cy.get('#favoriteEquipment').type('Appareil photo');
    cy.get('#xpPro').type('J\'ai travaillé en tant que photographe professionnel pendant 5 ans.');

    cy.get('button[type="submit"]').click();

    cy.get('a[href="/profil"]').click()
    cy.url().should('include', '/profil')

    cy.get('p').contains('Nom:').should('contain.text', 'Doe');
    cy.get('p').contains('Prénom:').should('contain.text', 'John');
    cy.get('p').contains('Date de naissance:').should('contain.text', '2000-01-14');
    cy.get('p').contains('Email:').should('contain.text', 'test@gmail.com');
    /*cy.get('p').contains('Sexe:').should('contain.text', 'Homme');*/
    cy.get('p').contains('Localisation:').should('contain.text', 'Paris');
    cy.get('p').contains('Equipement favori:').should('contain.text', 'Appareil photo');
    cy.get('p').contains('Experience professionnelle:').should('contain.text', 'J\'ai travaillé en tant que photographe professionnel pendant 5 ans.');
  })

});