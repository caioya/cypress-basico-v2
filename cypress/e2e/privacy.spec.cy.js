
it('verify link independent way', function (){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})