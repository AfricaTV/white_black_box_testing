/// <reference types="cypress" />

/**
 * EQUIVALENCE PARTITIONING
 * 
 * Black Box technique that divides input data into partitions
 * where system behavior should be equivalent.
 * 
 * Partitions:
 * - Valid code (recognized programming languages)
 * - Invalid/empty input
 */

describe('Black Box: Equivalence Partitioning', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('.connection-status').should('contain', 'CONNECTED', { timeout: 10000 })
  })

  it('EP-1: Valid partition - Python code should be recognized and highlighted', () => {
    const pythonCode = `def hello():
    print("Hello World")
    
if __name__ == "__main__":
    hello()`
    
    cy.get('[data-testid="code-input"]').type(pythonCode, { delay: 0 })
    cy.get('[data-testid="btn-execute"]').click()
    
    cy.get('[data-testid="output-container"]').should('contain', 'def')
    cy.get('[data-testid="language-badge"]').should('contain', 'PYTHON')
  })

  it('EP-2: Invalid partition - Empty input should disable Execute button', () => {
    cy.get('[data-testid="code-input"]').should('have.value', '')
    cy.get('[data-testid="btn-execute"]').should('be.disabled')
    
    // Whitespace-only input is also invalid
    cy.get('[data-testid="code-input"]').type('   ', { delay: 0 })
    cy.get('[data-testid="btn-execute"]').should('be.disabled')
  })
})
