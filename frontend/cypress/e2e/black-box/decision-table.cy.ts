/// <reference types="cypress" />

/**
 * DECISION TABLE TESTING
 * 
 * Black Box technique using a table of all possible combinations
 * of input conditions and their expected outcomes.
 * 
 * Decision Table for Execute Button:
 * | Code Present | Backend Online | Execute Button |
 * |--------------|----------------|----------------|
 * | No           | Yes            | Disabled       |
 * | Yes          | Yes            | Enabled        |
 */

describe('Black Box: Decision Table Testing', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('.connection-status').should('contain', 'CONNECTED', { timeout: 10000 })
  })

  it('DT-1: Code=No, Backend=Online → Execute=Disabled', () => {
    cy.get('.connection-status').should('contain', 'CONNECTED')
    cy.get('[data-testid="code-input"]').should('have.value', '')
    
    cy.get('[data-testid="btn-execute"]').should('be.disabled')
  })

  it('DT-2: Code=Yes, Backend=Online → Execute=Enabled, produces output', () => {
    cy.get('[data-testid="code-input"]').type('const x = 1;', { delay: 0 })
    cy.get('.connection-status').should('contain', 'CONNECTED')
    
    cy.get('[data-testid="btn-execute"]').should('not.be.disabled')
    cy.get('[data-testid="btn-execute"]').click()
    
    cy.get('[data-testid="output-container"]').should('contain', 'const x')
    cy.get('[data-testid="language-badge"]').should('be.visible')
  })
})
