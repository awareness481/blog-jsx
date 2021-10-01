/// <reference types="cypress" />

describe("Accessibility", () => {
  it("should log accessibility failures" , () => {
    cy.visit('/');
    cy.screenshot();
    cy.injectAxe();
    cy.screenshot();
    cy.checkA11y();

    cy.visit('/posts/hello-world');
    cy.screenshot();
    cy.injectAxe();
    cy.checkA11y();
  });
});
