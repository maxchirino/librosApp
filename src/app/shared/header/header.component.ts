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

  menu: MenuItem[] = [
    {
      texto: 'Libros',
      ruta: './listado'
    },
    {
      texto: 'Autores',
      ruta: './autores'
    },
    {
      texto: 'Buscar por titulo',
      ruta: './por-titulo'
    },
    {
      texto: 'Buscar por autor',
      ruta: './por-autor'
    }
  ]

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
      ruta: './por-nombre'
    },
    {
      texto: 'Por apellido',
      ruta: './por-nombre'
    },
    {
      texto: 'Por nombre o apellido',
      ruta: './por-nombre'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
