describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
      cy.visit('/');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      cy.screenshot('Produtos-01-LoginSucesso');
    });
  
    it('deve validar a exibição da lista de produtos após o login', () => {
      cy.get('.inventory_list').should('be.visible');
      cy.get('.inventory_item').should('have.length.greaterThan', 1);
      cy.screenshot('Produtos-02-ListaDeProdutosVisivel');
    });
  
    it('deve ordenar os produtos por todas as opções do filtro', () => {
      cy.get('.product_sort_container').select('az');
      cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Backpack');
      cy.get('.inventory_item_name').last().should('contain', 'Test.allTheThings() T-Shirt (Red)');
      cy.screenshot('Produtos-03-FiltroAZ');
  
      cy.get('.product_sort_container').select('za');
      cy.get('.inventory_item_name').first().should('contain', 'Test.allTheThings() T-Shirt (Red)');
      cy.get('.inventory_item_name').last().should('contain', 'Sauce Labs Backpack');
      cy.screenshot('Produtos-04-FiltroZA');
  
      cy.get('.product_sort_container').select('lohi');
      cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Onesie');
      cy.get('.inventory_item_name').last().should('contain', 'Sauce Labs Fleece Jacket');
      cy.screenshot('Produtos-05-FiltroLowHigh');
  
      cy.get('.product_sort_container').select('hilo');
      cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Fleece Jacket');
      cy.get('.inventory_item_name').last().should('contain', 'Sauce Labs Onesie');
      cy.screenshot('Produtos-06-FiltroHighLow');
    });
  
  });
  