// cypress/e2e/login.cy.js

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should successfully login with valid credentials", () => {
    cy.get('input[type="type"]').type("test_user");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
    cy.contains("Welcome back");
  });

  it("should show error message with invalid credentials", () => {
    cy.get('input[type="type"]').type("wrong_user");
    cy.get('input[type="password"]').type("wrong_password");
    cy.get('button[type="submit"]').click();

    cy.contains("Login failed!!Please try again");
  });
});
