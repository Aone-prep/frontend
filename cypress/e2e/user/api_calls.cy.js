// cypress/e2e/api-calls.cy.js

describe("API Calls", () => {
  beforeEach(() => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("BACKEND_URL")}/user/login`,
    }).as("loginRequest");

    // Clear any existing token before each test
    localStorage.removeItem("token");
  });

  it("should make a successful login request", () => {
    cy.visit("/login");
    cy.get('input[type="type"]').type("test_user");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("token");

      // Store the token for subsequent tests
      localStorage.setItem("token", interception.response.body.token);
    });

    cy.url().should("include", "/home");
  });

  it("should return an error for invalid login credentials", () => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        username: "wrong_user",
        password: "wrong_password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("message");
    });
  });

  it("should include the authorization header for authenticated requests", () => {
    // Login first to get the token
    cy.login("test_user", "password");

    cy.request({
      method: "GET",
      url: "/protected-route",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message");
    });
  });

  it("should return an error for unauthorized access to protected routes", () => {
    cy.request({
      method: "GET",
      url: "/protected-route",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("message");
    });
  });
});
