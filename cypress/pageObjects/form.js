const form = {
    fillAndSubmitForm: () => {
        cy.get('#firstName').type('Caio')
        cy.get('#lastName').type('Yabiku')
        cy.get('#email').type('caioyabikutest@outlook.com', {log: false})
        cy.get('#open-text-area').type("Testing")
        cy.contains('button', 'Enviar').click()
    }
}

 module.exports = form

    /**
export function fillAndSubmitForm () {
    cy.get('#firstName').type('Caio')
    cy.get('#lastName').type('Yabiku')
    cy.get('#email').type('caioyabikutest@outlook.com', {log : false})
    cy.get('#open-text-area').type("Testing")
    cy.contains('button','Enviar').click()
}**/
