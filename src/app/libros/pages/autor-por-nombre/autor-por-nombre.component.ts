import { Component } from '@angular/core';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-autor-por-nombre',
  templateUrl: './autor-por-nombre.component.html',
  styleUrls: ['./autor-por-nombre.component.css']
})
export class AutorPorNombreComponent  {
  termino: string = '';

  constructor(private librosService: LibrosService) { }

  buscar() {
    this.librosService.buscarAutorPorNombre(this.termino)
      .subscribe({
        next: (autor) => {
          console.log(autor);
        },
        error: (err) => {
          console.info(err);
        }
      })
  }
}
