// cypress/e2e/register.cy.js

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should successfully register a new user", () => {
    const testUser = {
      firstName: "Test",
      lastName: "User",
      username: "testuser123",
      email: "testuser123@example.com",
      password: "password123",
    };

    cy.get('input[name="first_name"]').type(testUser.firstName);
    cy.get('input[name="last_name"]').type(testUser.lastName);
    cy.get('input[name="username"]').type(testUser.username);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);

    cy.get('button[type="submit"]').click();

    cy.contains("Registration successful! Please login.");
    cy.url().should("include", "/login");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('button[type="submit"]').click();

    cy.get("input[required]").each(($el) => {
      expect($el[0].validationMessage).to.not.be.empty;
    });
  });
});
