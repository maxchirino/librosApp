import { Component } from '@angular/core';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  menu: MenuItem[] = [
    {
      texto: 'Listado',
      ruta: './listado'
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

}
