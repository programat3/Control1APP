describe('Verificar mi aplicacion', () => {
  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(3000);
      cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
      cy.wait(3000);
      cy.get('#password').invoke('val', '1234');
      cy.wait(3000);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        // cy.wait(3000);
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc UC');
        cy.get('#saludo').should('contain.text', '¡Bienvenido! Juan Perez Gonzsales!')
      });
    });
  });

  it('Verificar login con credenciales correctas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(3000);
      cy.get('#correo').invoke('val', 'admin@duocuc.cl');
      cy.wait(3000);
      cy.get('#password').invoke('val', 'admin');
      cy.wait(3000);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        // cy.wait(3000);
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc UC');
        // cy.get('#saludo').should('contain.text', '¡Bienvenid@! Carla Fuentes')
        // cy.wait(3000);
        // cy.contains('Cerrar Sesion').click();
      });
    });
  });
});