describe('Funcionalidade: Checkout', () => {

  it('deve permitir que um usuário finalize uma compra com sucesso', () => {
    
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');

    
    cy.screenshot('checkout-apos-login');

    cy.get('.btn_inventory').first().click();
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 1);

    
    cy.screenshot('checkout-carrinho-com-1-item');

    cy.get('.checkout_button').click();
    cy.url().should('include', '/checkout-step-one.html');

    
    cy.screenshot('checkout-step-one');

    cy.get('#first-name').type('Julia');
    cy.get('#last-name').type('Gabrielle');
    cy.get('#postal-code').type('12345-0102');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible');

    
    cy.screenshot('checkout-step-two');

    cy.contains('.cart_button', 'FINISH').click();

    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');

    
    cy.screenshot('checkout-complete');
  });

});
