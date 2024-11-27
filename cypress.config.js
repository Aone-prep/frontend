module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000", // Frontend base URL
    env: {
      BACKEND_URL: "http://localhost:3030/user", // Backend base URL
    },
    // Other Cypress configurations
  },
};
