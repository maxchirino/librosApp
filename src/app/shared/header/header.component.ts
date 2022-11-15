import { Component, OnInit } from '@angular/core';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  submenuBuscarLibro: MenuItem[] = [
    {
      texto: 'Por título',
      ruta: './por-titulo'
    },
    {
      texto: 'Por autor',
      ruta: './por-autor'
    }
  ]

  submenuBuscarAutor: MenuItem[] = [
    {
      texto: 'Por nombre',
      ruta: './autor-por-nombre'
    },
    {
      texto: 'Por apellido',
      ruta: './autor-por-apellido'
    },
    {
      texto: 'Por nombre o apellido',
      ruta: './autor-por-nombre-o-apellido'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
