describe('Jornada de Compra Completa do Usuário', () => {
 
    it('deve fazer login, manipular produtos e carrinho, e finalizar um checkout', () => {
      
      cy.visit('/');
      
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
   
      cy.url().should('include', '/inventory.html');
   
      cy.get('.inventory_list').should('be.visible');
   
      cy.get('.product_sort_container').select('hilo');
      cy.get('.inventory_item_name').first().should('contain', 'Fleece Jacket');
   
      // Adiciona dois produtos ao carrinho
      cy.contains('.inventory_item', 'Sauce Labs Backpack').find('button').click();
      cy.contains('.inventory_item', 'Sauce Labs Bike Light').find('button').click();
      cy.get('.shopping_cart_badge').should('have.text', '2');
   
      // Vai para o carrinho e valida os itens
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').should('have.length', 2);
      cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
      cy.get('.cart_list').should('contain', 'Sauce Labs Bike Light');
   
      // Remove um item
      cy.contains('.cart_item', 'Sauce Labs Bike Light').find('button').click();
      cy.get('.cart_item').should('have.length', 1);
   
      // Inicia o processo de checkout
      cy.get('.checkout_button').click();
      cy.url().should('include', '/checkout-step-one.html');
   
      // Preenche os dados obrigatórios
      cy.get('#first-name').type('Julia');
      cy.get('#last-name').type('Gabrielle');
      cy.get('#postal-code').type('12345-012');
      cy.get('input[type="submit"]').click();
   
      // Valida o resumo da compra
      cy.url().should('include', '/checkout-step-two.html');
      cy.get('.summary_total_label').should('be.visible');
   
      // Finaliza a compra e valida a mensagem de sucesso
      cy.contains('.cart_button', 'FINISH').click();
      cy.url().should('include', '/checkout-complete.html');
      cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');
    });
   
  });