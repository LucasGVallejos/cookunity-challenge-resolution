import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3t7x1h',
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  video: false,
});
