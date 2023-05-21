describe('sample render test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the title text', () => {
    cy.get('label').contains('Time of year:');
  });
});
