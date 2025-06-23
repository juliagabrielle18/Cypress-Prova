import { defineConfig } from "cypress";
 
export default defineConfig({
  e2e: {
    // Adicionamos aqui a URL base da aplicação da prova
    baseUrl: 'https://www.saucedemo.com/v1/',
 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
