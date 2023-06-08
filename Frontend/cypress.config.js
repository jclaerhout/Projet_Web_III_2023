const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    baseUrl: 'https://photo-pro.vercel.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
