/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    const user = {}

    this.beforeEach(() => {
        cy.visit('./src/index.html');
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');

        user.firstName = 'Natália';
        user.lastName = 'Alarcon';
        user.email = 'natalia.alarcon@test.com';
        user.phone = '11912345678';
        user.openTextArea = 'Teste de campo aberto :D';
    })

    it('complete required fields and subimit forms', function(){
       cy.get('#firstName').type(user.firstName);
       cy.get('#lastName').type(user.lastName);
       cy.get('#email').type(user.email);
       cy.get('#open-text-area').type(user.openTextArea, {delay:0});
       cy.contains('button', 'Enviar').click();
       cy.get('.success').should('be.visible');
    })

    it('show error message - invalid email', function(){
        cy.get('#firstName').type(user.firstName);
        cy.get('#lastName').type(user.lastName);
        cy.get('#email').type('natalia.alarcon.error.com');
        cy.get('#open-text-area').type(user.openTextArea);
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })
    
    it('test numeric field', function(){
        cy.get('#phone').type('teste num&rico').should('be.empty');
    })

    it('phone field should be required', function(){
        cy.get('#firstName').type(user.firstName);
        cy.get('#lastName').type(user.lastName);
        cy.get('#email').type(user.email);
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type(user.openTextArea);
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('fill and clear name, last name, email and phone fields', function(){
        cy.get('#firstName')
            .type(user.firstName)
            .should('have.value',user.firstName)
            .clear()
            .should('be.empty');
        cy.get('#lastName')
            .type(user.lastName)
            .should('have.value',user.lastName)
            .clear()
            .should('be.empty');
        cy.get('#email')
            .type(user.email)
            .should('have.value',user.email)
            .clear()
            .should('be.empty');
        cy.get('#phone')
            .type(user.phone)
            .should('have.value',user.phone)
            .clear()
            .should('be.empty');
    })

    it('subimit an empty form', function(){
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('fill and submit forms with custom commands', function(){
        cy.fillMandatoryFieldsAndSubmit(user);
        cy.get('.success').should('be.visible');
    })

    it.only('select "YouTube" prodct by text', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube');
    })

    it.only('select "Mentoria" product by value', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    })

    it.only('select "Blog" by index', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog');
    })
})
