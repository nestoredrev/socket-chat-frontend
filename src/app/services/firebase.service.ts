import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuario:any = {};
  usuarioLoginGoogle:any = {};

  constructor(public auth: AngularFireAuth, private http: HttpClient) {

    this.usuario = {};
    this.usuarioLoginGoogle = {};
    this.auth.signOut();

    this.auth.authState.subscribe( user => {
      if(user)
      {
        console.log('Estado del usuario',user);
        this.usuario.uid = user.uid;
        this.usuario.nombre = user.displayName;
        this.usuario.email = user.email;
        this.usuario.foto = user.photoURL;
        user.getIdToken().then(token => {
          this.usuario.token = token;
        });
        console.log(this.usuario);
      }
      else
      {
        return;
      }
    })
  }

  async loginPopUp(proveedor:string) 
  {
    if(proveedor == 'google')
    {
      // En new auth vienen todos los tipos de Autentificacion que google nos ofrece
      // Google, Facebook, GitHub, Twitter etc...

      let providerGoogle = new auth.GoogleAuthProvider();
      let usuario = await this.auth.signInWithPopup(providerGoogle);
      let token = await usuario.user.getIdToken(true);

      (await this.checkToken(token)).subscribe(res => {
        this.usuarioLoginGoogle = res;
        this.guardarSesionUsuario(res);
      })

      return this.usuarioLoginGoogle;
    }
  }

  // Registrar usuario con Email y Contraseña de Autentificacion de Google Firebase
  async signupGoogle(email:string, pass: string, nombre: string)
  {
    return await this.auth.createUserWithEmailAndPassword(email, pass).then( usuarioCreado => {
      usuarioCreado.user.updateProfile({
        displayName: nombre,
        photoURL: '/assets/img/noFoto.png'
      })
    });
  }

  // Login con Email y Contraseña de Autentificacion de Google Firebase
  async loginGoogle(email:string, pass:string)
  {
      let usarioLogin = await this.auth.signInWithEmailAndPassword(email, pass);

      let tokenLoginNormal =  await usarioLogin.user.getIdToken(true);
      console.log(tokenLoginNormal);
      (await this.checkToken(tokenLoginNormal)).subscribe(res => {
        this.usuarioLoginGoogle = res;
        this.guardarSesionUsuario(res);
      })

      return this.usuarioLoginGoogle;
  }

  // Validar el token en el backend y si es correcto devuelve el payload del usuario logeado
  async checkToken(token)
  {
    return this.http.post('http://localhost:3000/google', {token});
  }




  private guardarSesionUsuario(usuario)
  {
    localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
  }

  getSesionUsuario()
  {
    if(localStorage.getItem('usuarioSesion'))
    {
      return JSON.parse(localStorage.getItem('usuarioSesion'));
    }
  }


  // Cerrar session con autentificacion de Google
  logout() 
  {
    localStorage.setItem('usuarioSesion', null);
    this.usuario = {};
    this.auth.signOut();
  }

}
