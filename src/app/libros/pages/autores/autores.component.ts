import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Autor } from '../../interfaces/autor.interface';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

  autores: Autor[] = []

  ordenarPor: string = '1';
  tipoOrden: string = '1';

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getAutores()
      .subscribe({
        next: (autores: Autor[]) => {
          this.autores = autores;
        },
        error: (err) => {
          console.info(err);
        }
      });
  }

  ordenar(ordenarPor: string, tipoOrden: string) {
    this.ordenarPor = ordenarPor;
    this.tipoOrden = tipoOrden;
    this.librosService.ordenarAutores(ordenarPor, tipoOrden)
      .subscribe({
        next: (autores: Autor[]) => {
          this.autores = autores;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
