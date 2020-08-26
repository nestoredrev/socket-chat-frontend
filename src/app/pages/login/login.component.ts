import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignNormalService } from '../../services/sign-normal.service';
import { SocketChatService } from '../../services/socket-chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;
  errorInitSesion:boolean = false;

  constructor(private router: Router, 
              private firebaseService: FirebaseService,
              private SignNormalService: SignNormalService,
              private socketService: SocketChatService,
              private formBuild: FormBuilder) { }



  loginFormNormal()
  {

    let data = {
      email: this.formLogin.value.correo,
      password: this.formLogin.value.pass
    }

    this.errorInitSesion = false;

    this.SignNormalService.signInForm(data).subscribe(sesionUsuario => {
      console.log('Resputa login normal formulario', sesionUsuario);

      this.socketService.emitir('usuarioLogeado', sesionUsuario ).subscribe(usuariosConectados => {
        console.log('Usuarios conectados ',usuariosConectados);

        this.router.navigate( ['/nav/home'] );

      });

    },(err => {
      this.errorInitSesion = true;
      console.log(err.error);
    }))
  }

  loginPopUp(proveedor:string)
  {

    this.firebaseService.loginPopUp(proveedor).then( usuarioGoogle => {

      this.errorInitSesion = false;
      console.log('Usuario Logeado desde Google', usuarioGoogle);
      this.router.navigate(['/nav/home']);

    }).catch(err => {
      console.log(err);
      this.errorInitSesion = true;
    });
  }

  loginFormGoogle()
  {

    let email = this.formLogin.value.correo;
    let pass = this.formLogin.value.pass;
    this.errorInitSesion = false;

    this.firebaseService.loginGoogle(email, pass).then(usuarioGoogleNormal => {

      this.errorInitSesion = false;
      console.log('Usuario Logeado Normal Correo/Contraseña',usuarioGoogleNormal);
      this.router.navigate(['/nav/home']);

    }).catch(err => {
      this.errorInitSesion = true;
      console.log(err);
    });
  }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario()
  {
    this.formLogin = this.formBuild.group({
      correo: [ 'nestor69@abv.bg', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] ],
      pass: [ '123456', [Validators.required, Validators.minLength(6)] ]
    });
  }
}


