describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should display the registration form with all required fields", () => {
    cy.get('input[name="first_name"]').should("be.visible");
    cy.get('input[name="last_name"]').should("be.visible");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible").and("not.be.disabled");
  });

  it("should show placeholders in all input fields", () => {
    cy.get('input[name="first_name"]')
      .should("have.attr", "placeholder")
      .and("not.be.empty");
    cy.get('input[name="last_name"]')
      .should("have.attr", "placeholder")
      .and("not.be.empty");
    cy.get('input[name="username"]')
      .should("have.attr", "placeholder")
      .and("not.be.empty");
    cy.get('input[name="email"]')
      .should("have.attr", "placeholder")
      .and("not.be.empty");
    cy.get('input[name="password"]')
      .should("have.attr", "placeholder")
      .and("not.be.empty");
  });

  it("should maintain input values when typed into fields", () => {
    cy.get('input[name="first_name"]')
      .type("John")
      .should("have.value", "John");
    cy.get('input[name="last_name"]').type("Doe").should("have.value", "Doe");
    cy.get('input[name="username"]')
      .type("johndoe123")
      .should("have.value", "johndoe123");
    cy.get('input[name="email"]')
      .type("johndoe@example.com")
      .should("have.value", "johndoe@example.com");
    cy.get('input[name="password"]')
      .type("password123")
      .should("have.value", "password123");
  });

  it("should navigate to login page when 'Login here' is clicked", () => {
    cy.get("button").contains("Login here").click();
    cy.contains("Login").should("be.visible");
  });
});
