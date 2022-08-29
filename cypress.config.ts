import { defineConfig } from 'cypress';

export default defineConfig({
    viewportHeight: 1080,
    viewportWidth: 1980,
    e2e: {
        baseUrl: 'http://localhost:4200',
        specPattern: 'cypress/integration/**/*.{js, jsx, ts, tsx}',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
