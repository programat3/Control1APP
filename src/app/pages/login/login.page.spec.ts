// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { LoginPage } from './login.page';

// // describe('LoginPage', () => {
// //   let component: LoginPage;
// //   let fixture: ComponentFixture<LoginPage>;

// //   beforeEach(async(() => {
// //     fixture = TestBed.createComponent(LoginPage);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   }));

// //   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/model/Usuario';

describe('Pruebas Página Ingreso:', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), FormsModule, CommonModule, LoginPage],
            providers: [DataBaseService, AuthService, Storage, SqliteService, DataBaseService],
        }).compileComponents();


        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('Prueba para crear la pagina de ingreso', () => {
        expect(component).toBeTruthy();
    });
    it('Debería asignar correo y contraseña a nombre de Ana Torres', () => {
        expect(component.correo).toBe('atorres@duocuc.cl');
        expect(component.password).toBe('1234');
    });
    it('Debería poder iniciar sesión con Ana Torres', async () => {

        const authService = TestBed.inject(AuthService);
        spyOn(authService, 'login');
        component.correo = 'atorres@duocuc.cl';
        component.password = '1234';
        await component.ingresar();
        expect(authService.login).toHaveBeenCalledWith('atorres@duocuc.cl', '1234');
    });



});


describe('Pruebas para la clase Usuario', () => {
    let usuario: Usuario;

    beforeEach(() => {
        usuario = new Usuario();
    });

    it('debería validar el campo de correo', () => {
        const resultado = usuario.validarCorreo('');
        expect(resultado).toContain('El campo "correo" debe tener un valor.');

    });

    it('debería validar el campo de contraseña', () => {
        const resultado = usuario.validarPassword('');
        expect(resultado).toContain('El campo "contraseña" debe tener un valor.');

    });

    it('debería validar el nombre', () => {
        const resultado = usuario.validarNombre('');
        expect(resultado).toContain('El campo "nombre" debe tener un valor.');

    });


    it('debería validar el apellido', () => {
        const resultado = usuario.validarApellido('');
        expect(resultado).toContain('El campo "apellido" debe tener un valor.');

    });


    it('debería validar la Pregunta secreta', () => {
        const resultado = usuario.validarPreguntaSecreta('');
        expect(resultado).toContain('El campo "pregunta secreta" debe tener un valor.');

    });

    it('debería validar la Respuesta Secreta', () => {
        const resultado = usuario.validarRespuestaSecreta('');
        expect(resultado).toContain('El campo "respuesta secreta" debe tener un valor.');

    });

    it('debería establecer y obtener los datos del usuario correctamente', () => {
        usuario.setUsuario('atorres@duocuc.cl', '123', 'Ana Torres', 'Nombre de Mascota', 'gato');
        expect(usuario.correo).toBe('atorres@duocuc.cl');
        expect(usuario.nombre).toBe('Ana Torres');

    });


    it('debería obtener un usuario con los datos dados', () => {
        const nuevoUsuario = Usuario.getUsuario('atorres@duocuc.cl', '123', 'Ana Torres', 'Nombre de Mascota', 'gato');
        expect(nuevoUsuario.correo).toBe('atorres@duocuc.cl');
        expect(nuevoUsuario.nombre).toBe('Ana Torres');

    });



});