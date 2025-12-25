/// <reference types="cypress" />

/**
 * STATE TRANSITION TESTING
 * 
 * Black Box technique that models system behavior as a state machine.
 * 
 * States:
 * - INITIAL: Empty input, buttons disabled
 * - CODE_ENTERED: Code present, ready to execute
 * - HIGHLIGHTED: Result displayed
 * 
 * Transitions:
 * - INITIAL → CODE_ENTERED (input code)
 * - CODE_ENTERED → HIGHLIGHTED (execute)
 * - HIGHLIGHTED → INITIAL (clear)
 */

describe('Black Box: State Transition Testing', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('.connection-status').should('contain', 'CONNECTED', { timeout: 10000 })
  })

  it('ST-1: Transition INITIAL → CODE_ENTERED → HIGHLIGHTED', () => {
    // INITIAL state
    cy.get('[data-testid="btn-execute"]').should('be.disabled')
    
    // Transition to CODE_ENTERED
    cy.get('[data-testid="code-input"]').type('const state = 1;', { delay: 0 })
    cy.get('[data-testid="btn-execute"]').should('not.be.disabled')
    
    // Transition to HIGHLIGHTED
    cy.get('[data-testid="btn-execute"]').click()
    cy.get('[data-testid="output-container"]').should('contain', 'state')
    cy.get('[data-testid="language-badge"]').should('be.visible')
  })

  it('ST-2: Transition HIGHLIGHTED → INITIAL (clear resets all)', () => {
    // Reach HIGHLIGHTED state
    cy.get('[data-testid="code-input"]').type('const result = 42;', { delay: 0 })
    cy.get('[data-testid="btn-execute"]').click()
    cy.get('[data-testid="output-container"]').should('contain', 'result')
    
    // Transition to INITIAL via clear
    cy.get('[data-testid="btn-clear"]').click()
    
    // Verify INITIAL state
    cy.get('[data-testid="code-input"]').should('have.value', '')
    cy.get('[data-testid="btn-execute"]').should('be.disabled')
    cy.get('[data-testid="language-badge"]').should('not.exist')
  })
})
