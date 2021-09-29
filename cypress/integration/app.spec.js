/// <reference types="cypress" />

describe("Accessibility", () => {
  it("should log accessibility failures" , () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y();

    cy.visit('/hello-world');
    cy.injectAxe();
    cy.checkA11y();
  });
});
