import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(lista:any, termino:string): any {
    console.log(lista);
    console.log(termino);

    if(termino != '')
    {
      return lista.filter(dataLista => dataLista.nombre.toLowerCase().indexOf( termino.toLowerCase() ) > -1 );
    }
    else
    {
      return lista;
    }

  }

}
