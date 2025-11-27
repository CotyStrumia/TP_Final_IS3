import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5174',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,

    specPattern: [
      "cypress/e2e/ventas_flow.cy.js",
      "cypress/e2e/acceptance.cy.js"
    ],

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:8080'
    }
  },
});