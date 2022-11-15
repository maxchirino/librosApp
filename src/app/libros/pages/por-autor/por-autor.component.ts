import { Component } from '@angular/core';

import { Libro } from '../../interfaces/libro.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-por-autor',
  templateUrl: './por-autor.component.html',
  styleUrls: ['./por-autor.component.css']
})
export class PorAutorComponent {
  termino: string = '';
  hayError: boolean = false;
  arrLibros: (Libro[])[] = [];
  libros: Libro[] = []

  constructor(private librosService: LibrosService) { }

  buscar() {
    this.hayError = false;
    this.librosService.buscarLibroPorAutor(this.termino)
      .subscribe({
        next: (libros) => {
          this.arrLibros = libros;
          /* Como recibo un arreglo de arreglos, uso flat para que quede un simple arreglo de libros */
          this.libros = this.arrLibros.flat();
        },
        error: (err) => {
          this.hayError = true;
          this.arrLibros = [];
          this.libros = [];
        }
      })
  }
}
