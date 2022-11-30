import { Component } from '@angular/core';

import { Autor } from '../../interfaces/autor.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-autor-por-nombre-o-apellido',
  templateUrl: './autor-por-nombre-o-apellido.component.html',
  styleUrls: ['./autor-por-nombre-o-apellido.component.css']
})
export class AutorPorNombreOApellidoComponent {

  termino: string = '';
  hayError: boolean = false;
  autores: Autor[] = [];

  constructor(private librosService: LibrosService) { }

  buscar() {
    this.librosService.buscarAutorPorNombreOApellido(this.termino).subscribe({
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
