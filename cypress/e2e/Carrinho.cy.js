 
describe('Funcionalidade: Carrinho de Compras', () => {
 
  beforeEach(() => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });
 
  it('deve adicionar 4 itens, validar e remover um item do carrinho', () => {
   
    cy.get('.inventory_item').first().find('.inventory_item_name').invoke('text')
      .then((itemParaRemover) => {
 
        cy.get('.btn_inventory').eq(0).click();
        cy.get('.btn_inventory').eq(1).click();
        cy.get('.btn_inventory').eq(2).click();
        cy.get('.btn_inventory').eq(3).click();
 
        cy.get('.shopping_cart_badge').should('have.text', '4');
 
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_item').should('have.length', 4);
        cy.get('.cart_list').should('contain', itemParaRemover);
 
        cy.contains('.cart_item', itemParaRemover).within(() => {
          cy.contains('button', 'REMOVE').click();
        });
 
        cy.get('.cart_item').should('have.length', 3);
        cy.get('.shopping_cart_badge').should('have.text', '3');
        cy.get('.cart_list').should('not.contain', itemParaRemover);
      });
  });
 
});
 
 
 
 