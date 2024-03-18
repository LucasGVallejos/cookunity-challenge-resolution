describe('Deliveries page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should have 2 products in the first delivery', () => {
    cy.getByTestId('product-card').should('have.length', 2);
    cy.getByTestId('cart-counter').should('have.text', '2');
  });

  it('should have 1 product in the second delivery', () => {
    cy.get('.tabs > :nth-child(2)').click();
    cy.getByTestId('product-card').should('have.length', 1);
    cy.getByTestId('cart-counter').should('have.text', '1');
  });

  it('should have the correct title for a regular delivery status', () => {
    cy.getByTestId('subheader-title').should('have.text', 'Confirm your order');
  });

  it('should have the buttons with the correct state for a regular delivery status', () => {
    cy.getByTestId('header-cta').should('contain.text', 'Confirm');
    cy.getByTestId('subheader-cta').should('contain.text', 'Confirm');
  });

  it('should have the Confirm copy in subheader when is a regular delivery', () => {
    cy.getByTestId('subheader-title').should('have.text', 'Confirm your order');
  });

  it('should have the Reschedule copy in subheader when is a holiday delivery', () => {
    cy.get('.tabs > :nth-child(2)').click();
    cy.getByTestId('subheader-title').should(
      'have.text',
      'Reschedule your order'
    );
  });

  it('should have the buttons with the correct state for a holiday delivery status', () => {
    cy.get('.tabs > :nth-child(2)').click();
    cy.getByTestId('header-cta').should('contain.text', 'Reschedule');
    cy.getByTestId('subheader-cta').should('contain.text', 'Reschedule');
  });

  it('should show a "Confirmed" modal when confirm cta is clicked', () => {
    cy.get('.tabs > :nth-child(1)').click();
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.getByTestId('header-cta')
      .click()
      .wait(200)
      .then(() => {
        expect(stub.getCall(0).calledWith('Confirmed')).eq(true);
      });

    cy.getByTestId('subheader-cta')
      .click()
      .wait(200)
      .then(() => {
        expect(stub.getCall(1).calledWith('Confirmed')).eq(true);
      });
  });

  it('should show a "Rescheduled" modal when reschedule cta is clicked', () => {
    cy.get('.tabs > :nth-child(2)').click();
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.getByTestId('header-cta')
      .click()
      .wait(200)
      .then(() => {
        expect(stub.getCall(0).calledWith('Rescheduled')).eq(true);
      });

    cy.getByTestId('subheader-cta')
      .click()
      .wait(200)
      .then(() => {
        expect(stub.getCall(1).calledWith('Rescheduled')).eq(true);
      });
  });
});
