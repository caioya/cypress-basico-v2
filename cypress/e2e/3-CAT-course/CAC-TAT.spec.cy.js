describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_MS = 3000

    beforeEach(function () {
        cy.clock()
        cy.visit('./src/index.html')
    })

    it('verify the title of the application', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('verify and submit a successful form without Custom Commands and Page Objects', function () {
        const longText = 'Test1, Test2, Test3, Test4, Test5, Test6, Test7, Test8, Test9, Test10'
        cy.get('#firstName').type('Caio')
        cy.get('#lastName').type('Yabiku')
        cy.get('#email').type('caioyabikutest@outlook.com', {log : false})
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('verify the display error message when the form is submitted with an invalid format', function (){
        cy.get('#firstName').type('Caio')
        cy.get('#lastName').type('Yabiku')
        cy.get('#email').type('caioyabikutest@outlook,com')
        cy.get('#open-text-area').type('Testing')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('verify the telephone field is still empty when populated with a non-numeric value', function (){
        cy.get('#phone')
            .type('Testing')
            .should('have.value','')
    })

    it('verify the display error message when the telephone field turns mandatory', function (){
        cy.get('#firstName').type('Caio')
        cy.get('#lastName').type('Yabiku')
        cy.get('#email').type('caioyabikutest@outlook.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Testing')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('verify filling and clearing fields', function (){
        cy.get('#firstName')
            .type('Caio')
            .should('have.value','Caio')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Yabiku')
            .should('have.value','Yabiku')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('caioyabikutest@outlook.com')
            .should('have.value','caioyabikutest@outlook.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('12345678')
            .should('have.value','12345678')
            .clear()
            .should('have.value','')

    })

    it('verify the display error message when the form is submitted with all mandatory fields empty', function (){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('verify and submit a successful form using Custom Commands', function (){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('verify and submit a successful form using Page Objects', function (){
        const formPage = require('../../pageObjects/form')
        formPage.fillAndSubmitForm()
        cy.get('.success').should('be.visible')
    })

    it('verify the form submitted with all mandatory fields populated using contains', function () {
        cy.get('#firstName').type(Cypress.env('name'))
        cy.get('#lastName').type(Cypress.env('lastName'))
        cy.get('#email').type('caioyabikutest@outlook.com')
        cy.get('#open-text-area').type('Testing')
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('selecting a random option from a dropdown without a verification', function (){
        cy.fillMandatoryFields()
        cy.get('#product option:not([value=""])')
            .its('length').then(n => {
                const randomOptionIndex =  Cypress._.random(1, n)
                cy.get('#product').select(randomOptionIndex)
            })
    })

    it('selecting a random option from a dropdown with a verification', function (){
        cy.fillMandatoryFields()
        cy.get('#product option:not([value=""])')
            .its('length').then(n => {
                cy.get('#product option:not([value=""])').then($options => {
                    const randomOptionIndex =  Cypress._.random(1, n)
                    const randomOptionValue = $options[randomOptionIndex - 1].getAttribute('value')
                    cy.get('#product').select(randomOptionIndex).should('have.value',randomOptionValue)
                })
        })
    })

    it('verify the form submitted with the radio checked', function (){
        cy.fillMandatoryFields()
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('verify each radio checked', function (){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function ($radio) {
                cy.wrap($radio).check().should("be.checked")
            })
    })

    it('verify checking every checkbox and unmarking the last', function (){
        cy.get('#check input')
            .check()
            .should("be.checked")
            .uncheck(['phone'])
            /** ANOTHER WAY
             * .last()
            .uncheck()**/
            .should("not.be.checked")
    })

    it('verify selecting a file from fixture folder', function (){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/LICENSE')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('LICENSE')
            })
            /** ANOTHER WAY
             * .then(input => {
                    expect(input[0].files[0].name).to.equal('LICENSE')
            })**/
    })

    it('verify selecting a file from fixture folder with drag and drop', function (){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/LICENSE', { action: 'drag-drop'})
                .then(input => {
                    expect(input[0].files[0].name).to.equal('LICENSE')
         })
    })

    it('verify selecting a file from fixture folder with alias', function (){
        cy.fixture('LICENSE').as('license')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@license')
            .then(input => {
                expect(input[0].files[0].name).to.equal('LICENSE')
            })
    })

    it('verify link without clicking', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('verify link removing the target and clicking', function (){
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('display and hide success and errors messages', function (){
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('fill text using invoke', function () {
        const longText = Cypress._.repeat('12345 ',100)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

    })

    it('request a GET endpoint', function () {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should (function(response) {
                const { status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
         })
    })

    it('challenge: show cat', function (){
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
    })

    it.only('challenge: show cat using invoke', function (){
        cy.get('#cat')
            .invoke('css', 'display', 'block')
            .should('be.visible')
    })
})

