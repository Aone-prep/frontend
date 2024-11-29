describe("Admin Routes", () => {
    it("should not allow access to admin pages without login", () => {
      cy.visit("/admin/dashboard");
      cy.url().should("not.include", "/admin/dashboard");
      cy.contains("Please login as admin to access this page");
  
      cy.visit("/admin/manage");
      cy.url().should("not.include", "/admin/manage");
      cy.contains("Please login as admin to access this page");
    });
  
    it("should allow access to admin pages after login", () => {
      cy.loginAsAdmin("admin_user", "admin_password");
  
      cy.visit("/admin/dashboard");
      cy.url().should("include", "/admin/dashboard");
      cy.contains("Admin Dashboard");
  
      cy.visit("/admin/manage");
      cy.url().should("include", "/admin/manage");
      cy.contains("Manage Content");
    });
  });
  