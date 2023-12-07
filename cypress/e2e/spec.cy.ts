beforeEach(() => {
  cy.exec('localStorage.clear()');
  cy.exec('sessionStorage.clear()');
  cy.clearCookies();
});

describe('Verificar mi aplicacion', () => {
  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.clearAllSessionStorage({ log: true })
      cy.wait(3000);
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.wait(3000);
      cy.get('#password').type('1234');
      cy.wait(3000);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc UC');
        cy.get('#saludo').should('contain.text', '¡Bienvenido! Juan Perez Gonzsales!')
      });
    });
  });

  it('Verificar login con credenciales correctas', () => {
    cy.reload(true);
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(3000);
      cy.get('#correo').type('admin@duocuc.cl');
      cy.wait(3000);
      cy.get('#password').type('admin');
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
  it('Prueba botones Home', () => {
    cy.reload(true);
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(3000);
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').type('1234');
      cy.wait(1000);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        cy.get('#botonQR').click();
        cy.wait(1500);
        cy.get('#botonMiClase').click();
        cy.wait(1500);
        cy.get('#botonForo').click();
        cy.wait(1500);
        cy.get('#botonMisDatos').click();
        cy.wait(1500);
      });
    });
  });
});