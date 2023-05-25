describe('Test de l\'Us-7 -> completion de profil', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Connection à un profil utilisateur', () => {
    cy.visit('/')
    cy.get('a[href="/connection"]').click()
    cy.url().should('include', '/connection')

    cy.get('input[type="email"]').type('test@gmail.com');
    cy.get('input[type="password"]').type('123');
    cy.get('form').submit();

    cy.url().should('include', '/profil')
  })

  it('Accès à la page de complétion de profil', () => {
    cy.get('a[href="/completion-profil"]').click()
    cy.url().should('include', '/completion-profil');
  })

  it('Remplit et soumet le formulaire', () => {
    cy.get('input[aria-label="Prénom"]').type('John');
    cy.get('input[aria-label="Nom"]').type('Doe');
    cy.get('input[aria-label="Date de naissance"]').type('1990-01-01');
    cy.get('input[aria-label="Sexe"]').click().type('Homme{enter}');
    cy.get('textarea[aria-label="Description personnelle"]').type('Je suis un utilisateur passionné.');
    cy.get('input[aria-label="Localisation"]').type('Paris');
    cy.get('input[aria-label="Matériel favori"]').type('Appareil photo');
    cy.get('textarea[aria-label="Expérience professionnelle"]').type('J\'ai travaillé en tant que photographe professionnel pendant 5 ans.');

    cy.get('button[type="submit"]').click();
  });

  it('Vérifie l\'ajout des informations dans la page profil', () => {
    cy.get('a[href="/profil"]').click()
    cy.url().should('include', '/profil')

    cy.get('p').contains('Nom:').should('contain.text', 'Doe');
    cy.get('p').contains('Prénom:').should('contain.text', 'John');
    cy.get('p').contains('Date de naissance:').should('contain.text', '1990-01-01');
    cy.get('p').contains('Email:').should('contain.text', 'test@gmail.com');
    cy.get('p').contains('Sexe:').should('contain.text', 'Homme');
    cy.get('p').contains('Localisation:').should('contain.text', 'Paris');
    cy.get('p').contains('Equipement favori:').should('contain.text', 'Appareil photo');
    cy.get('p').contains('Experience professionnelle:').should('contain.text', 'J\'ai travaillé en tant que photographe professionnel pendant 5 ans.');
  })

});
