import { Component } from '@angular/core';

import { Autor } from '../../interfaces/autor.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-autor-por-apellido',
  templateUrl: './autor-por-apellido.component.html',
  styleUrls: ['./autor-por-apellido.component.css']
})
export class AutorPorApellidoComponent {

  termino: string = '';
  hayError: boolean = false;
  autores: Autor[] = [];

  constructor(private librosService: LibrosService) { }

  buscar() {
    this.librosService.buscarAutorPorApellido(this.termino).subscribe({
      next: (autores: Autor[]) => {
        this.autores = autores;
        this.hayError = false;
      },
      error: (err) => {
        console.info(err);
        this.hayError = true;
        this.autores = [];
      }
    })
  }

}
