import { Injectable } from '@angular/core';
import { environment }  from '../../environments/environment';

// npm install socket.io-client
// npm install @types/socket.io-client
import * as io from 'socket.io-client';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketChatService {

  private socket:any;

  constructor() {

    this.socket = io(environment.ws_url);

    this.socket.on('connect', function(){
      console.log('conexion establecida');
    });

    this.socket.on('disconnect', function(){
      console.log('Desconexion del servidor');
    });
  }



  // Recibir informacion desde el servidor
  escuchar(evento:string)
  {
    return new Observable( (subscriber) => {
      this.socket.on(evento, (data:any) => {
        subscriber.next(data);
      })
    })
  }



  //Enviar informacion al servidor
  emitir(evento:string, data:any)
  {
    return new Observable( (subscriber) => {
      this.socket.emit(evento, data, (respuesta:any) => {
        subscriber.next(respuesta);
      })
    })
  }

}
