/// <reference types="cypress" />

describe("Accessibility", () => {
  it("should log accessibility failures" , () => {
    cy.visit('/');
    cy.contains('Fail test')
    cy.screenshot();
    cy.injectAxe();
    cy.checkA11y();

    cy.visit('/posts/hello-world');
    cy.screenshot();
    cy.injectAxe();
    cy.checkA11y();
  });
});
