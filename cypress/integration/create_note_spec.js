import uuidv1 from 'uuid/v1'

it('creates note', function() {
  const noteTitle = uuidv1()

  cy.visit('/')
  cy.get('[data-test=CreateNote__button]').click()
  cy.get('[data-test=Note__title]').clear()
  cy.get('[data-test=Note__title]').type(noteTitle)
  cy.get('[data-test=Note__body]').clear()
  cy.get('[data-test=Note__body]').type('My awesome note body')
  cy.reload()
  cy.get('[data-test=NoteList').contains(noteTitle)
})
