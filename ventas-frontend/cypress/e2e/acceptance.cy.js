describe('Acceptance - flujo básico de integración', () => {
  it('verifica que la app carga y permite login', () => {
    // Visitar página de login
    cy.visit('/login');
    cy.get('body').should('not.be.empty');
    
    // Hacer login real
    cy.get('input[placeholder="Email"]').type('ariel');
    cy.get('input[placeholder="Password"]').type('piqui123');
    cy.contains('Ingresar').click();
    
    // Verificar que redirige (no queda en /login)
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    
    // Navegar a productos
    cy.visit('/productos');
    cy.url().should('include', '/productos');
    cy.get('body').should('contain', 'Productos');
  });
});
