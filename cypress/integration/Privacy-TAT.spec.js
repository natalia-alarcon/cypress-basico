/// <reference types="Cypress" />

describe('Política de privacidade', () => {
    it('testa página de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');
        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible')
    })
})