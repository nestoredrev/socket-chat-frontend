import { Component, OnInit } from '@angular/core';
import { SocketChatService } from '../../services/socket-chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensaje:string = '';
  termino:string = '';
  usuarios:any;
  sesionUsuario = JSON.parse(localStorage.getItem('usuarioSesion'));
  startPrivateChat:boolean = false;
  salas:string[] = ['Juegos', 'Futbol', 'Fiesta'];
  conversacion:any = [];
  chatSelected:string = '';
  tipoChat:string = '';
  tituloChat:string = '';

  constructor(private socketService: SocketChatService) {

    /*
      Cuando el usaruio refresca el navegador socket se desconecta y se conecta de nuevamente
      por lo tanto hay que llamar el evento connect de nuevo para que no se pierdan las personas conectadas
    */
    this.socketService.escuchar('connect').subscribe( () => {
      
      this.socketService.emitir('usuarioLogeado', this.sesionUsuario).subscribe(listaUsuarios => {
        this.usuarios = listaUsuarios;
      });

    });



    /* Obtener los usuarios conectados una vez cargado el componente */
    this.socketService.emitir('getListaUsuarios',{}).subscribe(listaUsuarios => {
      console.log('llamar el broadcast', listaUsuarios);
      this.usuarios = listaUsuarios;
    });



    this.socketService.escuchar('msgEnterExit').subscribe(respuesta => {
      console.log(respuesta);
    });

    this.socketService.escuchar('recibirMensajeChat').subscribe( (respuesta:any) => {
      
      console.log(respuesta);

      const data = {
        nombre: respuesta.nombre,
        mensaje: respuesta.mensaje,
        fecha: respuesta.fecha
      }
  
      this.conversacion.push(data);
    });

    





    this.socketService.escuchar('listaUsuarios').subscribe(listaUsuarios => {
      console.log('Usuario en la aplicacion', listaUsuarios);
      this.usuarios = listaUsuarios;
    });




  }

  ngOnInit() {
  }

  initPrivateChat(id:string, tipo:string, usuarioNombre?:string)
  {
    this.conversacion = [];
    this.chatSelected = id;
    this.tipoChat = tipo;
    
    if(usuarioNombre)
    {
      this.tituloChat = usuarioNombre;
    }
    else
    {
      this.tituloChat = id;
    }
  }

  enviarMensaje()
  {

    if(this.mensaje.trim().length === 0) return;

    console.log(this.sesionUsuario.usuario);
    console.log(this.mensaje);
    console.log(this.tipoChat);

    if(this.tipoChat === 'sala')
    {

      const data = {
        id: this.chatSelected,
        nombre: this.chatSelected,
        mensaje: this.mensaje,
        fecha: new Date().getTime()
      }
  
      this.conversacion.push(data);
    
      this.socketService.emitir('mensajePrivado', data).subscribe(respuesta => {
        console.log(respuesta);
      });

    }
    else if(this.tipoChat === 'usuario')
    {

      const data = {
        id: this.chatSelected,
        nombre: this.sesionUsuario.usuario.nombre,
        mensaje: this.mensaje,
        fecha: new Date().getTime()
      }
  
      this.conversacion.push(data);
      this.mensaje = '';
  
      this.socketService.emitir('mensajePrivado', data).subscribe(respuesta => {
        console.log(respuesta);
      });

    }
    else
    {
      return;
    }
  }
}
