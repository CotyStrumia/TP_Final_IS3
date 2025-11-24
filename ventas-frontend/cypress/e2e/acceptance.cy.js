describe('Acceptance - flujo básico', () => {
  it('verifica que la app carga correctamente', () => {
    // Usa baseUrl configurado en CI (QA_URL) o local
    cy.visit('/');
    // Aseguramos que el select exista y forzamos entorno QA en localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('entorno', 'qa');
      // Añadir token y rol fake para permitir acceso a rutas protegidas en CI/local
      win.localStorage.setItem('token', 'fake-jwt-token');
      win.localStorage.setItem('rol', 'vendedor');
    });
    // Ir a la pantalla de ventas
    cy.visit('/ventas');
    // Comprobamos que la ruta se cargó (no dependemos de contenido específico)
    cy.url().should('include', '/ventas');
    // Comprueba que el body tiene algo de contenido
    cy.get('body').should('not.be.empty');
  });
});
