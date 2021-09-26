/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("/cypress");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/about");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("About Page");
  });
});

describe("Accessibility", () => {
  it("should log accessibility failures" , () => {
    cy.visit('/cypress');
    cy.injectAxe();
    cy.checkA11y()
  });
});
