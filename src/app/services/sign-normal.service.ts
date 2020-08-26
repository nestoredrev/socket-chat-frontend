import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignNormalService {

  usuarioLoginNormal:any = {};

  constructor(private http: HttpClient) { }

  signInForm(data)
  {
    return this.http.post('http://localhost:3000/login', data )
                    .pipe(
                      map(respuesta => {
                        this.usuarioLoginNormal = respuesta;
                        this.guardarSesionUsuario(respuesta);
                        return respuesta;
                      })
                    )
  }

  signUpForm(data)
  {
    return this.http.post('http://localhost:3000/signup', data );
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

  

  // Cerrar session con autentificacion por Formulario
  logout() 
  {
    localStorage.setItem('usuarioSesion', null);
    this.usuarioLoginNormal = {};
  }


}
