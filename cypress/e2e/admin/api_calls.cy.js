describe("Admin API Calls", () => {
    beforeEach(() => {
      // Clear token before each test
      localStorage.removeItem("adminToken");
    });
  
    it("should make a successful admin login request", () => {
      cy.request({
        method: "POST",
        url: "/admin/login",
        body: {
          username: "admin_user",
          password: "admin_password",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
  
        // Store the token for subsequent tests
        localStorage.setItem("adminToken", response.body.token);
      });
    });
  
    it("should return an error for invalid admin login credentials", () => {
      cy.request({
        method: "POST",
        url: "/admin/login",
        body: {
          username: "wrong_admin",
          password: "wrong_password",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("message");
      });
    });
  
    it("should include the authorization header for authenticated admin requests", () => {
      cy.loginAsAdmin("admin_user", "admin_password");
  
      cy.request({
        method: "GET",
        url: "/admin/protected-route",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("message");
      });
    });
  
    it("should return an error for unauthorized access to admin protected routes", () => {
      cy.request({
        method: "GET",
        url: "/admin/protected-route",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("message");
      });
    });
  });
  