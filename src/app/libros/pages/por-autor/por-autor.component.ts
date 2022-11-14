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
  libros: Libro[] = [];


  constructor(private librosService: LibrosService) { }

  buscar() {
    this.hayError = false;
    this.librosService.buscarLibroPorIdAutor(Number(this.termino) || 0)
      .subscribe({
        next: (libros) => {
          this.libros = libros;
          // console.log(libros);
        },
        error: (err) => {
          // console.info(err);
          this.hayError = true;
          this.libros = [];
        }
      })
  }
}
