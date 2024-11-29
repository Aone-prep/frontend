describe("User Routes", () => {
  it("should not allow access to user pages without login", () => {
    cy.visit("/home");
    cy.url().should("not.include", "/home");
    cy.contains("Login to A-one Prep");

    cy.visit("/courses");
    cy.url().should("not.include", "/courses");
    cy.contains("Login to A-one Prep");
  });
});
