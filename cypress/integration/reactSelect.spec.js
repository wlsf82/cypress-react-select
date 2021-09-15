describe('React Select', () => {
  beforeEach(() => cy.visit('/home'))

  context('Single', () => {
    const BASIC_SINGLE = '.basic-single'

    beforeEach(() => {
      cy.get(BASIC_SINGLE)
        .find('.select__clear-indicator')
        .click()
    })

    it('selects by searching for a color', () => {
      cy.get(BASIC_SINGLE)
        .find('input[type="text"]')
        .type('Green{enter}')

      cy.get(BASIC_SINGLE)
        .find('.select__single-value')
        .should('have.text', 'Green')
    })

    it('selects a color via the dropdown list', () => {
      cy.get('.basic-single ')
        .find('.select__dropdown-indicator')
        .click()
      cy.contains('.select__option', 'Yellow').click()

      cy.get(BASIC_SINGLE)
        .find('.select__single-value')
        .should('have.text', 'Yellow')
    })
  })

  context('Multi', () => {
    beforeEach(() => {
      cy.get('.basic-multi-select')
        .as('multiSelect')
        .find('.select__clear-indicator')
        .first()
        .click()
    })

    it('selects multiple options then removes one', () => {
      cy.get('@multiSelect')
        .find('input[type="text"]')
        .first()
        .type('Yellow{enter}')
      cy.get('@multiSelect')
        .find('.select__dropdown-indicator')
        .first()
        .click()
      cy.contains('.select__option', 'Red').click()

      cy.get('@multiSelect')
        .find('.select__value-container')
        .should('contain', 'Yellow')
        .and('contain', 'Red')

      cy.get('@multiSelect')
        .find('.select__multi-value__remove')
        .first()
        .click()

      cy.get('@multiSelect')
        .find('.select__value-container')
        .should('contain', 'Red')
        .and('not.contain', 'Yellow')
    })
  })
})
