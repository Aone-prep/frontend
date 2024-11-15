// cypress/e2e/api-calls.cy.js

describe("API Calls", () => {
  beforeEach(() => {
    // Clear any existing token before each test
    localStorage.removeItem("token");
  });

  it("should make a successful login request", () => {
    cy.request({
      method: "POST",
      url: "/user/login",
      body: {
        username: "test_user",
        password: "password",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");

      // Store the token for subsequent tests
      localStorage.setItem("token", response.body.token);
    });
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
