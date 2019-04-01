/// <reference types="Cypress" />

describe('My First Test', function() {
  it('finds the content "type"', function() {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    cy.url().should('include', '/commands/actions')
  })
})
