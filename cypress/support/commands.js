
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user) => { 
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#email').type(user.email);
    cy.get('#open-text-area').type(user.openTextArea, {delay:0});
    cy.contains('button', 'Enviar').click();
 });
