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

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getAutores()
      .subscribe({
        next: (autores: Autor[]) => {
          this.autores = autores;
          console.log(this.autores);
        },
        error: (err) => {
          console.info(err);
        }
      });
  }

}
