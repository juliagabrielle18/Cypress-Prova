describe('Funcionalidade: Login e Logout', () => {
  
    beforeEach(() => {
      cy.visit('/');
    });
   
    it('deve realizar o login com sucesso usando credenciais válidas', () => {
      cy.screenshot('Login-01-TelaInicial');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.screenshot('Login-02-CredenciaisValidas_Preenchidas');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      cy.screenshot('Login-03-LoginComSucesso');
    });
   
    it('deve exibir uma mensagem de erro com credenciais inválidas', () => {
      cy.get('#user-name').type('usuario_invalido');
      cy.get('#password').type('senha_invalida');
      cy.screenshot('Login-04-CredenciaisInvalidas_Preenchidas');
      cy.get('#login-button').click();
      cy.get('h3[data-test="error"]').should('be.visible');
      cy.screenshot('Login-05-MensagemDeErroExibida');
    });
   
    it('deve realizar o logout com sucesso', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
   
      cy.get('.bm-burger-button').click();
      cy.get('#logout_sidebar_link').click();
   
      cy.url().should('not.include', '/inventory.html');
      cy.get('#login-button').should('be.visible');
      cy.screenshot('Logout-01-LogoutEfetuado');
    });
  });