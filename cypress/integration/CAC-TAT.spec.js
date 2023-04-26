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
        cy.get('#phone-checkbox').check();
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

    it('select "YouTube" prodct by text', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube');
    })

    it('select "Mentoria" product by value', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    })

    it('select "Blog" by index', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog');
    })

    it('check type of service', () => {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback');
    })

    it('check each type of service', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio)
                .check()
                .should('be.checked')
            });
    })

    it('check both checkbox and uncheck last', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked');
    })

    it('select file', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .then($input => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('select file - drag and drop action', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action:'drag-drop' })
            .then($input => {
                expect($input[0].files[0].name).to.equal('example.json')
            })            
    })
    it('select file using an alias', () => {
        cy.fixture('example.json', { encoding:null }).as('exampleFile')
        cy.get('#file-upload')
            .selectFile('@exampleFile')
            .then($input => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verify "política de privacidade" link without click', () => {
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    
    it('open a new link in the same tab', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            .url()
            .should('contain','/privacy.html')
        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible')
    })

    
})
