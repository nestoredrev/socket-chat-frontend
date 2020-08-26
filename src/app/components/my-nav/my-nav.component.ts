import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SignNormalService } from '../../services/sign-normal.service';
import { SocketChatService } from '../../services/socket-chat.service';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result  => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, 
              private route: Router,
              private firebaseService: FirebaseService,
              private signNormalService: SignNormalService,
              private socketService: SocketChatService) {
  }

  goHome()
  {
    this.route.navigate(['/nav/home']);
  }

  logout()
  {
    this.socketService.emitir('usuarioDeslogeado', null).subscribe();
    this.signNormalService.logout();
    this.firebaseService.logout();
    this.route.navigate(['/login']);
  }

}
