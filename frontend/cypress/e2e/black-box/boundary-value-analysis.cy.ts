/// <reference types="cypress" />

/**
 * BOUNDARY VALUE ANALYSIS
 * 
 * Black Box technique that focuses on testing values at the edges
 * of equivalence partitions where errors are most likely.
 * 
 * Boundaries:
 * - Minimum valid input (1 character)
 * - Large input (stress test)
 */

describe('Black Box: Boundary Value Analysis', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('.connection-status').should('contain', 'CONNECTED', { timeout: 10000 })
  })

  it('BVA-1: Minimum boundary - Single character should be processed', () => {
    cy.get('[data-testid="code-input"]').type('x')
    cy.get('[data-testid="btn-execute"]').should('not.be.disabled')
    cy.get('[data-testid="btn-execute"]').click()
    
    cy.get('[data-testid="output-container"]').should('contain', 'x')
  })

  it('BVA-2: Upper boundary - Large code should be processed without errors', () => {
    let largeCode = '// Large code test\n'
    for (let i = 0; i < 50; i++) {
      largeCode += `const var${i} = ${i};\n`
    }
    
    cy.get('[data-testid="code-input"]').invoke('val', largeCode).trigger('input')
    cy.get('[data-testid="code-input"]').type(largeCode, { delay: 0 })
    cy.get('[data-testid="btn-execute"]').click()
    
    cy.get('[data-testid="output-container"]').should('contain', 'var0')
    cy.get('[data-testid="output-container"]').should('contain', 'var49')
  })
})
