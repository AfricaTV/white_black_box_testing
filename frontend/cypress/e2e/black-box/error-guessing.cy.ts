/// <reference types="cypress" />

/**
 * ERROR GUESSING
 * 
 * Black Box technique based on tester's experience and intuition
 * to predict where errors might occur.
 * 
 * Potential error areas:
 * - XSS/injection attacks
 * - Special characters handling
 */

describe('Black Box: Error Guessing', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('.connection-status').should('contain', 'CONNECTED', { timeout: 10000 })
  })

  it('EG-1: XSS attack via script tag should be escaped, not executed', () => {
    const xssPayload = '<script>alert("XSS")</script>'
    
    cy.get('[data-testid="code-input"]').type(xssPayload, { delay: 0 })
    cy.get('[data-testid="btn-execute"]').click()
    
    // Page should not be compromised
    cy.get('.terminal').should('be.visible')
    // Code should be displayed as text
    cy.get('[data-testid="output-container"]').should('contain', 'script')
  })

  it('EG-2: Special characters (HTML entities) should be handled safely', () => {
    const specialChars = 'const html = "<div class=\'test\'>&amp;&lt;&gt;</div>";'
    
    cy.get('[data-testid="code-input"]').type(specialChars, { delay: 0 })
    cy.get('[data-testid="btn-execute"]').click()
    
    cy.get('[data-testid="output-container"]').should('contain', 'html')
    cy.get('[data-testid="output-container"]').should('be.visible')
  })
})
