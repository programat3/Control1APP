export class Usuario{
    public correo = '';
    public password = '';
    public nombre = '';
    public fraseSecreta = '';
    public respuestaSecreta = '';

    constructor(
        correo: string, password: string, nombre: string, fraseSecreta: string, respuestaSecreta: string)
    {
        this.correo = correo;
        this.password = password;
        this.nombre = nombre;
        this.fraseSecreta = fraseSecreta;
        this.respuestaSecreta = respuestaSecreta;
    }

    public listaUsuariosValidos(): Usuario[] {
        const lista =[]
        lista.push(new Usuario('atorres@duocuc.cl', '1234', 'Ana Torres Leiva'
            , 'Nombre de su mascota', 'gato'));
        lista.push(new Usuario('avalenzuela@duocuc.cl', 'qwer', 'Alberto Valenzuela Nuñez'
            , 'Nombre de su mejor amigo', 'juanito'));
        lista.push(new Usuario('cfuentes@duocuc.cl', 'asdf', 'Carla Fuentes Gonzales'
            , 'Lugar de nacimiento de su madre', 'Valparaíso'));
        return lista;
    }
    public buscarUsuarioValido(correo: string, password:string): Usuario | null{
        const usuario = this.listaUsuariosValidos().find(
            usu => usu.correo === correo && usu.password === password);
        if (usuario !== undefined){
            return usuario
        }else{
            return null
        }
    }
    public validarCorreo():string{
        if(this.correo.trim() === ''){
            return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
        }
        if (this.correo.length < 3 || this.correo.length > 8) {
            return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
        }
        return '';
    }
    public validarPassword(): string {
        if (this.password.trim() === '') {
          return 'Para entrar al sistema debe ingresar la contraseña.';
        }
        for(let i = 0; i < this.password.length; i++) {
          if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
            return 'La contraseña debe ser numérica.';
          }
        }
        if (this.password.length !== 4) {
          return 'La contraseña debe ser numérica de 4 dígitos.';
        }
        return '';
      }
    
    
    public validarUsuario(): string {
    return this.validarCorreo()
      || this.validarPassword();
      }
    
}