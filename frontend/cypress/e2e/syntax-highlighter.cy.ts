/// <reference types="cypress" />

describe('Syntax Highlighter', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the terminal interface and highlight code', () => {
    // check page loaded
    cy.get('.terminal').should('be.visible');
    cy.get('.input-block').should('be.visible');
    cy.get('.output-block').should('be.visible');

    // type code and click execute
    cy.get('[data-testid="code-input"]').type('const x = 1;');
    cy.get('[data-testid="btn-execute"]').click();

    cy.get('[data-testid="output-container"]').should("contain", "const x = 1;");

    // clear
    cy.get('[data-testid="btn-clear"]').click();

    cy.get('[data-testid="output-container"]').should("not.contain", "const x = 1;");

    // select language
    cy.get('[data-testid="language-select"]').select('javascript');
    
    cy.get('[data-testid="language-select"]').contains("javascript").should("be.visible");
  })
})
