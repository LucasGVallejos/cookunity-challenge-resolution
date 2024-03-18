/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (testId, ...args) => {
  return cy.get(`[data-test-id=${testId}]`, ...args);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
