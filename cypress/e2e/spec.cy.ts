describe('Verificar mi aplicacion', () => {
  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.clearAllSessionStorage({ log: true })
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.wait(1500);
      cy.get('#password').type('1234');
      cy.wait(1500);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc UC');
        // cy.get('#saludo').should('contain.text', '¡Bienvenido! Juan Perez Gonzsales!')
      });
    });
  });

  it('Verificar login con credenciales correctas', () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(1500);
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').type('1234');
      cy.wait(1500);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        cy.wait(3000);
        // cy.wait(3000);
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc UC');
        // cy.get('#saludo').should('contain.text', '¡Bienvenid@! Carla Fuentes')
        // cy.wait(3000);
        // cy.contains('Cerrar Sesion').click();
      });
    });
  });
  it('Prueba botones Home', () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(1500);
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').type('1234');
      cy.wait(1500);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        cy.get('#botonQR').click();
        cy.wait(1500);
        cy.get('#botonMiClase').click();
        cy.wait(1500);
        cy.get('#botonForo').click();
        cy.wait(1500);
        cy.get('#botonMisDatos').click();
        cy.wait(3000);
      });
    });
  });

  it('Prueba Recuperar contraseña', () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(1500);
      cy.contains('Recuperar Contraseña').click();
      cy.intercept('/correo').as('route').then(() => {
        cy.wait(1500);
        cy.get('#ingresarCorreo').type('atorres@duocuc.cl');
        cy.wait(1500);
        cy.get('#botonSiguiente').click();
        cy.wait(1500);
        cy.intercept('/pregunta').as('route').then(() => {
          cy.wait(1500);
          cy.get('#respuestaSecreta').type('gato');
          cy.wait(1500);
          cy.get('#validarPregunta').click();
          cy.wait(3000);
        });
      });
    });
  });

  it('Prueba recuperar contraseña con correo malo', () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(1500);
      cy.contains('Recuperar Contraseña').click();
      cy.intercept('/correo').as('route').then(() => {
        cy.wait(1500);
        cy.get('#ingresarCorreo').type('correo-inexistente@duocuc.cl');
        cy.wait(1500);
        cy.get('#botonSiguiente').click();
        cy.wait(3000);
      });
    });
  });

  it('Prueba Recuperar contraseña con correo bueno y respuesta mala', () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:8100/login').then(() => {
      cy.wait(1500);
      cy.contains('Recuperar Contraseña').click();
      cy.intercept('/correo').as('route').then(() => {
        cy.wait(1500);
        cy.get('#ingresarCorreo').type('cfuentes@duocuc.cl');
        cy.wait(1500);
        cy.get('#botonSiguiente').click();
        cy.wait(1500);
        cy.intercept('/pregunta').as('route').then(() => {
          cy.wait(1500);
          cy.get('#respuestaSecreta').type('Algo serio');
          cy.wait(1500);
          cy.get('#validarPregunta').click();
          cy.wait(3000);
        });
      });
    });
  });
});