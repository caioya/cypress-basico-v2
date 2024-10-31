Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Caio')
    cy.get('#lastName').type('Yabiku')
    cy.get('#email').type('caioyabikutest@outlook.com')
    cy.get('#open-text-area').type('Testing')
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('fillMandatoryFields', () => {
    cy.get('#firstName').type('Caio')
    cy.get('#lastName').type('Yabiku')
    cy.get('#email').type('caioyabikutest@outlook.com')
    cy.get('#open-text-area').type('Testing')
})

Cypress.Commands.add('functionReceivingUser', function (user){
    cy.get('#firstName').type('Caio')
    cy.get('#lastName').type('Yabiku')
    cy.get('#email').type('caioyabikutest@outlook.com')
    cy.get('#open-text-area').type('Testing')
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('arrowFunctionReceivingUser', user => {
    cy.get('#firstName').type('Caio')
    cy.get('#lastName').type('Yabiku')
    cy.get('#email').type('caioyabikutest@outlook.com')
    cy.get('#open-text-area').type('Testing')
    cy.contains('button','Enviar').click()
})
