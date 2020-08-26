import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { SignNormalService } from '../services/sign-normal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebaseService: FirebaseService,
              private signNormalService: SignNormalService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{


      if( this.firebaseService.getSesionUsuario() )
      {
        let usuarioGoogle = this.firebaseService.getSesionUsuario();
        if(usuarioGoogle.token.length > 2)
        {
          return true;
        }
        else
        {
            this.router.navigateByUrl('/login');
            return false;
        }
      }

      if( this.signNormalService.getSesionUsuario() )
      {
        let usuarioNormal = this.signNormalService.getSesionUsuario();
        if(usuarioNormal.token.length > 2)
        {
          return true;
        }
        else
        {
            this.router.navigateByUrl('/login');
            return false;
        }
      }
  }
}
