import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { Autor } from '../../interfaces/autor.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  autor!: Autor;
  cargado: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(param => this.librosService.getAutorPorId(param['id']))
      )
      .subscribe(autor => {
        // console.log(autor);
        this.autor = autor;
        this.cargado = true;
      });

  }

}
