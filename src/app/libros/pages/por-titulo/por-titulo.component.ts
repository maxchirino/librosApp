import { Component } from '@angular/core';

import { Libro } from '../../interfaces/libro.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-por-titulo',
  templateUrl: './por-titulo.component.html',
  styleUrls: ['./por-titulo.component.css']
})
export class PorTituloComponent  {

  termino: string = '';
  hayError: boolean = false;
  libros: Libro[] = [];

  constructor(private librosService: LibrosService) { }

  buscar() {
    this.hayError = false;
    this.librosService.buscarLibroPorTitulo(this.termino)
      .subscribe({
        next: (libros) => {
          this.libros = libros;
          // console.log(this.libros);
        },
        error: (err) => {
          // console.info(err);
          this.hayError = true;
          this.libros = [];
        }
      })
  }

}
