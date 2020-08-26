import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidadoresService } from '../../services/validadores.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { SignNormalService } from '../../services/sign-normal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formSignUp:FormGroup;

    // flags para las contraseñas
    hide:boolean = true;
    hideR:boolean = true;

  constructor(private formBuild: FormBuilder, 
              private myValidators: ValidadoresService, 
              private firebaseService: FirebaseService,
              private signService: SignNormalService,
              private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
      this.formSignUp = this.formBuild.group({
        correo: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
        nombre: ['', Validators.required],
        pass: ['', [Validators.required, Validators.minLength(6)] ],
        repeatPass: ['', Validators.required ],
    },{
      validators: this.myValidators.passwordsIguales('pass', 'repeatPass')
    })
  }

  onSubmitGoogle()
  {
    
    let email = this.formSignUp.value.correo;
    let pass = this.formSignUp.value.pass;
    let nombre = this.formSignUp.value.nombre;

    this.firebaseService.signupGoogle(email, pass, nombre).then(res => {
      console.log(res);
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
    })
  }

  onSubmitForm()
  {

    let data = {
      email:          this.formSignUp.value.correo,
      password:       this.formSignUp.value.pass,
      passwordRepeat: this.formSignUp.value.repeatPass,
      nombre:         this.formSignUp.value.nombre
    }

    this.signService.signUpForm(data).subscribe( respuesta => {
      console.log('Resputa Registro normal', respuesta);
    });
  }
}
