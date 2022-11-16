import { Component } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Autor } from '../../interfaces/autor.interface';

@Component({
  selector: 'app-autor-por-nombre',
  templateUrl: './autor-por-nombre.component.html',
  styleUrls: ['./autor-por-nombre.component.css']
})
export class AutorPorNombreComponent  {
  termino: string = '';
  hayError: boolean = false;
  autores: Autor[] = [];
  name: string = 'termino';

  constructor(private librosService: LibrosService) { }

  // buscar() {
  //   this.librosService.buscarAutorPorNombre(this.termino)
  //     .subscribe({
  //       next: (autores: Autor[]) => {
  //         this.autores = autores;
  //         this.hayError = false;
  //       },
  //       error: (err) => {
  //         console.info(err);
  //         this.hayError = true;
  //         this.autores = [];
  //       }
  //     })
  // }

  buscar = () => {
    this.librosService.buscarAutorPorNombre(this.termino)
    .subscribe({
      next: (autores: Autor[]) => {
        this.autores = autores;
        this.hayError = false;
      },
      error: (err) => {
        console.info(err);
        this.hayError = true;
        this.autores = [];
      }
    });
  }
}
