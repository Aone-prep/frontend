describe("Admin Login", () => {
    beforeEach(() => {
      cy.visit("/admin/login");
    });
  
    it("should successfully login with valid admin credentials", () => {
      cy.get('input[type="text"]').type("admin_user");
      cy.get('input[type="password"]').type("admin_password");
      cy.get('button[type="submit"]').click();
  
      cy.url().should("include", "/admin/dashboard");
      cy.contains("Welcome, Admin");
    });
  
    it("should show error message with invalid admin credentials", () => {
      cy.get('input[type="text"]').type("wrong_admin");
      cy.get('input[type="password"]').type("wrong_password");
      cy.get('button[type="submit"]').click();
  
      cy.contains("Admin login failed! Please try again");
    });
  });
  